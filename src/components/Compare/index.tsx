import React  from 'react';
import { useSelector } from 'react-redux';

import { RootState } from 'store';
import api from 'store/api';

import { maxTransferAmount, maxTransferSum } from 'utils/constants';

const Compare = () => {
  const offer = useSelector((state: RootState) => state.offer);
  const { data: prices = [0, 0] } = api.useGetUnistreamRateQuery();
  const price = Math.min(...prices);
  const { bank, bankFee, fee, networkFee } = useSelector((state: RootState) => state.form);

  if (!offer) {
    return null;
  }

  const sellPrice = offer.price;
  const bankWithoutFee = bankFee.isFixed ? bank.numValue - bankFee.numValue : bank.numValue * (100 - bankFee.numValue) / 100;
  const transferAmount = Math.min(Math.floor(Math.min(bankWithoutFee, maxTransferSum) / price), maxTransferAmount);
  const transferSum = transferAmount * price;
  const transferFinalSum = bankFee.isFixed ? transferSum + bankFee.numValue : transferSum * (100 + bankFee.numValue) / 100;
  const calculatedFee = transferAmount * fee.numValue / 100;
  const factFee = Math.ceil(calculatedFee);
  const usdtAmount = networkFee.isFixed ? transferAmount - factFee - networkFee.numValue : (transferAmount - factFee) * (100 - networkFee.numValue) / 100;
  const usdtPrice = transferFinalSum / usdtAmount;

  const greedyFee = Math.floor(calculatedFee);
  const greedyTransferAmount = Math.floor(greedyFee / fee.numValue * 100);
  const greedyTransferSum = greedyTransferAmount * price;
  const greedyTransferFinalSum = bankFee.isFixed ? greedyTransferSum + bankFee.numValue : greedyTransferSum * (100 + bankFee.numValue) / 100;
  const greedyUsdtAmount = networkFee.isFixed ? greedyTransferAmount - greedyFee - networkFee.numValue : (greedyTransferAmount - greedyFee) * (100 - networkFee.numValue) / 100;
  const greedyUsdtPrice = greedyTransferFinalSum / greedyUsdtAmount;

  const middlePrice = (transferFinalSum - transferFinalSum) / (usdtAmount - greedyUsdtAmount);

  const sellSum = sellPrice * usdtAmount;
  const profit = sellSum - transferFinalSum;
  const percentProfit = profit / transferFinalSum * 100;

  const greedySellSum = sellPrice * greedyUsdtAmount;
  const greedyProfit = greedySellSum - greedyTransferFinalSum;
  const greedyPercentProfit = greedyProfit / greedyTransferFinalSum * 100;

  const isGreedy = middlePrice > sellPrice;

  return (
    <div className="variants">
      <div className={['variant', isGreedy && 'disabledVariant'].filter(Boolean).join(' ')}>
        <ul>
          <li>Тратим {Number(transferFinalSum.toFixed(2))} ₽</li>
          <li>Переводим {transferAmount} USD</li>
          <li>Расчетная комиссия {Number(calculatedFee.toFixed(2))} USD</li>
          <li>Комиссия {factFee} USD</li>
          <li>Получаем {usdtAmount} USDT</li>
          <li>Цена закупа {Number(usdtPrice.toFixed(2))} ₽</li>
          <li>Продаем на {Number(sellSum.toFixed(2))}</li>
          <li>Профит {Number(profit.toFixed(2))} ({Number(percentProfit.toFixed(2))}%)</li>
        </ul>
      </div>
      {greedyTransferFinalSum > 0 && (
        <div className={['variant', !isGreedy && 'disabledVariant'].filter(Boolean).join(' ')}>
          <ul>
            <li>Тратим {Number(greedyTransferFinalSum.toFixed(2))} ₽</li>
            <li>Переводим {greedyTransferAmount} USD</li>
            <li>Комиссия {greedyFee} USD</li>
            <li>Получаем {greedyUsdtAmount} USDT</li>
            <li>Цена закупа {Number(greedyUsdtPrice.toFixed(2))} ₽</li>
            <li>Продаем на {Number(greedySellSum.toFixed(2))}</li>
            <li>Профит {Number(greedyProfit.toFixed(2))} ({Number(greedyPercentProfit.toFixed(2))}%)</li>
          </ul>
        </div>
      )}
    </div>
  );
};

export default Compare;
