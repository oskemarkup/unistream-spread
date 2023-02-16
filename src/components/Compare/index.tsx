import React  from 'react';
import { useSelector } from 'react-redux';
import classNames from 'classnames';

import { RootState } from 'store';
import api from 'store/api';

import { maxTransferAmount, maxTransferSum } from 'utils/constants';

import styles from './style.module.css';

const Compare = () => {
  const offer = useSelector((state: RootState) => state.offer);
  const { data: prices = [0, 0] } = api.useGetUnistreamRateQuery(undefined, {
    pollingInterval: 10 * 1000,
  });
  const price = Math.min(...prices);
  const { bank, bankFee, fee, networkFee } = useSelector((state: RootState) => state.form);

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

  const middlePrice = (transferFinalSum - greedyTransferFinalSum) / (usdtAmount - greedyUsdtAmount);

  const middlePriceParagraph = (
    <p>Граница &laquo;жадности&raquo;: {Number(middlePrice.toFixed(2))}</p>
  );

  if (!offer) {
    return middlePriceParagraph;
  }

  const sellPrice = offer.price;

  const sellSum = sellPrice * usdtAmount;
  const profit = sellSum - transferFinalSum;
  const percentProfit = profit / transferFinalSum * 100;

  const greedySellSum = sellPrice * greedyUsdtAmount;
  const greedyProfit = greedySellSum - greedyTransferFinalSum;
  const greedyPercentProfit = greedyProfit / greedyTransferFinalSum * 100;

  const isGreedy = middlePrice > sellPrice;

  const tableData = {
    body: [
      {
        label: 'Тратим, ₽',
        value: transferFinalSum,
        greedyValue: greedyTransferFinalSum,
      },
      {
        label: 'Переводим, USD',
        value: transferAmount,
        greedyValue: greedyTransferAmount,
      },
      {
        label: 'Расчетная комиссия, USD',
        value: calculatedFee,
        greedyValue: greedyFee,
      },
      {
        label: 'Комиссия, USD',
        value: factFee,
        greedyValue: greedyFee,
      },
      {
        label: 'Получаем, USDT',
        value: usdtAmount,
        greedyValue: greedyUsdtAmount,
      },
      {
        label: 'Цена закупа, ₽',
        value: usdtPrice,
        greedyValue: greedyUsdtPrice,
      },
      {
        label: 'Продаем на, ₽',
        value: sellSum,
        greedyValue: greedySellSum,
      },
    ],
    footer: [
      {
        label: 'Профит, ₽',
        value: profit,
        greedyValue: greedyProfit,
      },
      {
        label: 'Профит, %',
        value: percentProfit,
        greedyValue: greedyPercentProfit,
      },
    ],
  };

  return (
    <>
      <table className={styles.table}>
        <thead>
          <tr>
            <th>&nbsp;</th>
            <th className={classNames(!isGreedy && styles.highlighted)}>Щедрый</th>
            <th className={classNames(isGreedy && styles.highlighted)}>Жадный</th>
          </tr>
        </thead>
        <tbody>
          {tableData.body.map(row => (
            <tr key={row.label}>
              <th>{row.label}</th>
              <td className={classNames(!isGreedy && styles.highlighted)}>
                {Number(row.value.toFixed(2))}
              </td>
              <td className={classNames(isGreedy && styles.highlighted)}>
                {Number(row.greedyValue.toFixed(2))}
              </td>
            </tr>
          ))}
        </tbody>
        <tfoot>
          {tableData.footer.map(row => (
            <tr key={row.label}>
              <th>{row.label}</th>
              <td className={classNames(!isGreedy && styles.highlighted)}>
                {Number(row.value.toFixed(2))}
              </td>
              <td className={classNames(isGreedy && styles.highlighted)}>
                {Number(row.greedyValue.toFixed(2))}
              </td>
            </tr>
          ))}
        </tfoot>
      </table>
      {middlePriceParagraph}
    </>
  );
};

export default Compare;
