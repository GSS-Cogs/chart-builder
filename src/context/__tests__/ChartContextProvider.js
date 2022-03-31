import { getInitialChartProperties } from '../ChartContextProvider';

jest.mock('../ChartPropertiesSchema', () => ([
    {
      name: 'sectionOne',
      properties: [
        {
          name: 'propOneStr',
          defaultValue: 'a string',
        },
        {
          name: 'propOneNum',
          defaultValue: 99,
        }
      ],
    },
    {
      name: 'sectionTwo',
      properties: [
        {
          name: 'propTwoBool',
          defaultValue: false,
        },
      ],
    }
  ]
));


it('Extracts all `defaultValue`s to produce initial chart properties', () => {
  const initialProps = getInitialChartProperties();

  expect(initialProps).toEqual({
    "sectionOne": {
      "propOneNum": 99,
      "propOneStr": "a string"
    },
    "sectionTwo": {
      "propTwoBool": false
    }
  })
});