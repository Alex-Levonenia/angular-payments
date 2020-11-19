import {IMonth} from './interfaces/month.interface';

/**
 * Class that represents settings properties
 */
export class Settings {
  /**
   * List of all months with days numbers, titles and randomized ids.
   */
  public static MONTHS: IMonth[] = [
    {
      id: '64c26063-84f7-4666-be5c-ddd1ecba07fd',
      title: 'Янв',
      days: 31
    },
    {
      id: '0a088df3-3839-4423-81bc-ec97c9785e29',
      title: 'Фев',
      days: 28
    },
    {
      id: '5debea32-3a77-44a7-a2d2-9a36eb429aa6',
      title: 'Мар',
      days: 31
    },
    {
      id: '7af243d9-cd1f-406b-b0cd-313e5f4d2273',
      title: 'Апр',
      days: 30
    },
    {
      id: 'f411a277-0fda-43ef-a855-7b75cf8f473d',
      title: 'Май',
      days: 31
    },
    {
      id: 'f304b001-31a8-482c-8f52-0ad9136fa14f',
      title: 'Июнь',
      days: 30
    },
    {
      id: '35f0bece-c945-402a-8475-e5c9936a1fbf',
      title: 'Июль',
      days: 31
    },
    {
      id: '0feb49c7-7caa-43eb-9601-e33c695105f1',
      title: 'Авг',
      days: 31
    },
    {
      id: '2b67ea96-1987-4d38-bad0-75416989bc2c',
      title: 'Сен',
      days: 30
    },
    {
      id: 'f8528799-f18c-4f96-8fad-f03cbfdb617d',
      title: 'Окт',
      days: 31
    },
    {
      id: '6d2876af-ac7f-4f81-aa5c-895ee1433785',
      title: 'Ноя',
      days: 30
    },
    {
      id: '1c438057-5617-4452-a4c8-d757d9d06328',
      title: 'Дек',
      days: 31
    },
  ];
}
