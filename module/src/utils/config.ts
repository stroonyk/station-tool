

export enum STATION_LEVEL {

}

const StationConsts = {
  high: {
    compliantText:
      'Seriously non-compliant - Your arrangements fall well short of the minimum required legal standards and you should seek professional advice urgently.',
    buttonText: 'High',
    color: '#d9534f',
  },
  medium: {
    compliantText:
      'Requires improvement	- You have systems and procedures in place but they require review and improvement.',
    buttonText: 'Medium',
    color: '#f0ad4e',
  },
  low: {
    compliantText:
      'Satisfactory - Your systems and procedures are adequate but we recommend they be continuously reviewed to ensure they are up to date.',
    buttonText: 'Low',
    color: '#5cb85c',
  },
};
export { StationConsts };
