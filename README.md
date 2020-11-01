# react-mui-datagrid
> A React, Material UI datagrid that can be used off the shelf with most common features and data-driven customization.

[![NPM](https://img.shields.io/npm/v/react-mui-datagrid.svg)](https://www.npmjs.com/package/react-mui-datagrid) [![JavaScript Style Guide](https://img.shields.io/badge/code_style-standard-brightgreen.svg)](https://standardjs.com)

React-mui-datagrid in traditional style
![react-mui-datagrid in classic](https://upload.wikimedia.org/wikipedia/commons/a/a0/ScreenShot-react-mui-datagrid-4.png)

React-mui-datagrid in MUI style with sorting and 4-level grouping
![react-mui-datagrid in MUI](https://upload.wikimedia.org/wikipedia/commons/b/b5/ScreenShot-react-mui-datagrid-8.png)

See the [demo](https://codesandbox.io/s/kind-sky-1hetw) with playable user code.

## Features
- Column customization and validation based on user-given types:
numeric, string, date, email, array, object, image, pie chart.
- Column hiding and re-ordering with drag-and-drop from the settings popup.
- Create, update, delete and re-order column-based row groups with drag-and-drop from the settings popup.
- Independent sorting on columns (if marked as sortable) and group columns.
- Expand and shrink individual row groups; one-click expand and shrink all row groups.
- Calculate column-based, cross-row statistics such as sum, average, count and distinct count, and show them inside Datagrid headers or at Datagrid bottom.
- Data conversion in viewing mode, e.g. choose a currency from dropdown and see asset numbers change accordingly.
- Pagination or virtualization for large number of rows.
- Users can mark rows as mutable or not based on their application logics.
- Add, delete and update rows with error checkings and confirmation popups.
- Data editing based on user choices, e.g.
  - choose text field for a number or string.
  - choose calendar for a date.
  - choose multiple-selection dropdown for an array.
  - choose radio button group for single selection from a small set of options.
  - choose table (a cascaded react-mui-datagrid) for an object.
  - exclude certain data from the editing menu.
- Rich data provided by users
  - Props for cascading react-mui-datagrid to display and edit object type columns.
  - Pie chart legend including pie colors and popup labels.
  - List of pre-loaded images for image type columns.
  - default values for newly created rows. If undefined, react-mui-datagrid internally generates default values (0 for numeric, '' for string, [] for array, {} for object).
- User-driven style customiztion
  - choose between traditional style and MUI style (show surrounding borders or not).
  - choose Datagrid size (from tiny to giant) that affect sizes of all fonts, buttons, dropdown, popups, etc. proportionally.
  - calculate sizes of width, height, margins, paddings and indents for dynamic layouts.
  - beautify layouts after viewport resizing.
- User pluggins for deeper customization
  - dynamically create options for a field based on values given to its dependencies, e.g. show corresponding list of cities after the country is selected.
  - customized data validation logics (work in progress).
  - built-in data composition, e.g. net asset = asset - debt (work in progress).
- Performance improvements
  - virtualized Datagrid with sticky stats bar at the bottom and auto re-render on window resizing.
  - carefully implemented algorithms for manipulating matrix-style data (sorting, grouping, expand/shrink, and statistics).
  - separate data calculation and enhancement from DOM construction.
  - table pagination with page-change slider and user-provided page sizes.
  - use funtional components instead of class components.
  - use memoization with clearly defined dependencies.
- Other useful datagrid features
  - user-given datagrid title and description shown in the above-datagrid toolbar.
  - user-given context key word to differentiate datagrid in cascading cases.
  - export Datagrid contents to a csv file.
  - well-organized DOM element IDs to help element detection, e.g. for automated testing (work in progress).

All the features above (and more to come) are driven by Props to react-mui-datagrid and simple user pluggins. You can still clone it to build your own datagrid, but the goal of react-mui-datagrid is to save that effort and let you focus on building your application.

## Installation
```bash
npm install --save react-mui-datagrid
```
Note that react-mui-datagrid has the following peer dependencies, you need to install them yourself if have not done so.
```jsx
"peerDependencies": {
    "@material-ui/core": "^4.11.0",
    "@material-ui/icons": "^4.9.1",
    "prop-types": "15.7.2",
    "react": "^16.0.0",
    "react-beautiful-dnd": "^13.0.0",
    "react-csv": "^2.0.3",
    "react-dom": "^16.13.1",
    "react-minimal-pie-chart": "^8.0.1",
    "react-virtualized": "^9.22.2",
    "uuid": "^8.3.1"
  },
```
You might get NPM audit vulnerability alert "Prototype Polution" when install react-virtualized, sourced from "object-path". To solve that, add the following to your package.json and re-run "npm install":
```jsx
"scripts": {
    "preinstall": "npx npm-force-resolutions",
},
"resolutions": {
    "object-path": "0.11.5"
},
```
## Run app
```bash
npm install
npm start
```
## Usage
```jsx
import React from 'react';
import { Datagrid } from 'react-mui-datagrid';

export default function App() {
  return (
    <div style={{ margin: '1rem' }}>
      <Datagrid
        columns={columnData}
        rows={rowData}
      />
    </div>
  );
}
```
Now, let's see how to define columns and rows and pass more Props to Datagrid to drive its appearance and behavior. We use 'field' to refer to the intersection of column and row, i.e. a particular cell in the Datagrid.
### Define columns
Columns, as an object of objects, define how Datagrid header elements are constructed and how each field is displayed, updated and validated. They are essentially the rules guiding the Datagrid.
- **id**: unique ID of the column, used to identify the column (and the field within a row).
- **name**: used for internal DOM element name.
- **label**: shown as column header in the Datagrid.
- **type**: one of ['numeric', 'string', 'date', 'email', 'array', 'object', pieChart', 'image'], used to guide data display, processing and validation.
- **stat**: one of [false, 'sum', 'avg', 'distinct', 'count'].
  - false: skip statistics of fields along the column.
  - 'sum' (total) and 'avg' (average) apply to 'numeric' type columns.
  - 'distinct' (number of distinct values) and 'count' (number of instances for each distinct value) apply to 'string' type columns.
- **edit**: one of [false, 'text', 'dropdowm', 'radio', 'date', 'table'].
  - false: non-editable, e.g. column ID, Pie Chart, and image.
  - 'text': use TextField to edit the field.
  - 'dropdown': use custom-built DropdownSelector (multiple select if type is 'array') to edit the field.
  - 'radio': use Radio Group to edit the field.
  - 'date': use 'date' TextField (with calender) to edit the field.
  - 'table':use react-mui-datagrid to edit the field.
- **required**: if true, the field cannot be left blank during creating and editing.
- **sortable**: if true, the column is sortable (columns and group columns are sorted independently, rotating in three orders: descending, ascending and original).
- **width**: width of the column in Datagrid (column widths are transformed to %-based internally therefore only their relative widths count).
```jsx
const columnData = {
  id: { name: 'Id', label: 'ID', type: 'string', edit: false, stat: false, required: true, sortable: true, width: '1em', },
  firstName: { name: 'FirstName', label: 'First Name', type: 'string', edit: 'text', stat: false, required: true, sortable: true, width: '1em', },
  birthDate: { name: 'BirthDate', label: 'Birth Date', type: 'date', edit: 'date', stat: false, required: true, sortable: true, width: '0.8em', },
  email: { name: 'Email', label: 'Email', type: 'email', edit: 'text', stat: 'distinct', required: true, sortable: true, width: '1.6em', },
  avatar: { name: 'Avatar', label: 'Avatar', type: 'image', edit: false, stat: false, required: false, sortable: false, width: '0.6em', },
  roles: { name: 'Roles', label: 'Roles', type: 'array', edit: 'dropdown', stat: false, required: true, sortable: true, width: '0.8em', },
  currency: { name: 'Currency', label: 'Currency', type: 'string', edit: 'dropdown', stat: 'distinct', required: false, sortable: true, width: '0.6em', },
  netAsset: { name: 'NetAsset', label: 'Net Asset', type: 'numeric', edit: 'text', stat: 'avg', required: false, sortable: true, width: '1em', },
  investments: { name: 'Investments', label: 'Investments', type: 'pieChart', edit: false, stat: 'sum', required: false, sortable: false, width: '1em', },
};
```
### Define rows
Rows, as an array of objects, define the user data to fill the fields of all rows. Each key of the object maps to a column ID, e.g. firstName and birthDate, except two
- **id**: unique ID of the row (UUID is recommended).
- **mutable**: if true, the row can be updated or deleted.
```jsx
const rowData = [
  { id: "1153", firstName: "Shea", birthDate: "1981-06-07", email: "sborrel48@ameblo.jp", avatar: "avatar9", roles: ["Supplier", "Consumer", "Broker", ],  currency: "JPY", netAsset: 280742.82, investments: "(Pie chart: data missing)", mutable: false, },
  // other rows ...,
];
```
### Define Datagrid Props
To drive the rich behavior of react-mui-datagrid, a set of Props with minimized redundency are defined.
- **meta**: an object that contains
  - facet: one of ['classic', 'mui'], default is 'mui'. 'mui' follows MUI styles, i.e. no surrounding borders for DOM elements such as table cells, text fields and dropdowns. 'classic' follows traditional table style, i.e. surrounding borders for DOM elements.
  - size: one of ['tiny', 'small', 'regular', 'large', 'giant'], default is 'regular' (fontSize 14). Compared with changing HTML body level fontSize, this Prop allows you to scale the Datagrid relative to other DOM elements of your application.
  - context: a singular noun to uniquely indicate what the Datagrid is about, e.g. 'user', 'contact'.
  - title: title of the Datagrid shown in the above-datagrid toolbar.
  - desc: text shown in the above-datagrid toolbar as description of the Datagrid.
  - width: width of the entire Datagrid, in unit vw, e.g. 95.
  - height: height of the entire Datagrid including the pagination bar, in unit vh, e.g. 90.
- **columns**: an object of objects that define how to display, update and validate data in the Datagrid.
- **columnsHidden**: an array of IDs of columns not shown in the Datagrid. Column hiding feature is disabled if columnsHidden in undefined. Pass [] for columnsHidden if no columns are hidden initially.
- **groupColumns**: an array of column IDs and grouping rules used to group rows. Column-based row grouping is disabled if groupColumns in undefined. Pass [] for groupColumns if no rows are grouped initially.
- **defaultRow**: populate a new row when it is first created.
- **rows**: an array of objects where each object defines the user data to fill the fields of a row. Row adding feature is disabled if rows is undefined. Pass [] if there are no rows initially.
- **rowsPerPageOptions**: an array of number of rows per page, e.g. [10, 20, 30]. Datagrid pagination is disabled if rowsPerPageOptions is undefined, null, or empty.
- **virtualization**: an object that contains attributes used by the virtualized Datagrid. If not defined, use MUI Table with no virtualization. Although doable, Datagrid pagination and virtualization are usually not enabled at the same time.
  - rowHeight: height of rows in the virtualized Datagrid, in unit px, e.g. 40.
- **showStats**: if defined, calculate and display cross-row statistics. When *useVirtualizaion* is true, statistics are stickily displayed at the bottom of the Datagrid; otherwise, *showStatus* is one of ['top', 'bottom'], default is 'top'.
  - 'top': display statistics inside Datagrid headers so that they can always be seen.
  - 'bottom': display statistics as the last row, visible only when scrolled to the bottom.
- **onRowUpdated**: user-provided callback function to handle updated row. Row editing is disabled if onRowUpdated is undefined.
- **onRowDeleted**: user-provided callback function to handle deleted row. Row deleting is disabled if onRowDeleted is undefined.
- **onSettingsUpdated**: user-provided callback function to handle updated settings (hidden columns and row groups). Settings updating is disabled if onSettingsUpdated is undefined.
- **onRowAdded**: user-provided callback function to handle added row. Row adding is disabled if onRowAdded is undefined.
- **onRowRefresh**: user-provided callback function to handle row refresh (reset data conversion in viewing mode). Row refreshing is disabled if onRowRefresh is undefined.
- **enableExport**: if true, enable the feature that exports Datagrid contents to a CSV file. Default is false.
- **showTopToolbar**: if true, show the toolbar above the Datagrid. Default is false. The above-datagrid toolbar can contain these buttons: settings, add row, expand all, shrink all, refresh, and export. None of them will be present if showTopToolbar is undefined or set to false.
- **pieCharts**: an object of objects that contains data for each 'pieChart' type column.
- **images**: an object of objects that contains the list of loaded images for each 'image' type column.
```jsx
<Datagrid
    meta={{
       facet: 'classic',
       size: 'regular',
       context: 'user',
       title: 'New Users',
       desc: 'users joined since start of year',
       width: 98,
       height: 92,
    }}
    columns={columnData}
    columnsHidden={['id', 'suffix']}
    groupColumns={[]}
    defaultRow={{}}
    rows={rowData}
    rowsPerPageOptions={[10, 20, 30]}
    // useVirtualization={{ rowHeight: 40 }}
    showStats={'top'}
    onRowUpdated={handleUserUpdate}
    onRowDeleted={handleUserDelete}
    onSettingsUpdated={handleSettingsUpdate}
    onRowAdded={handleUserAdd}
    onRowRefresh={handleRowRefresh}
    enableExport={true}
    showTopToolbar={true}
    pieCharts={{ 'investments': investments }}
    images={{ 'avatar': avatars }}
/>
```
### More on Datagrid Props
Some react-mui-datagrid Props use sophisticated data structure. We will go through them in more details here.
#### 1. Row grouping by columns
Prop *groupColumns* is an array, where each element contains a column ID and the associated rule (type and criteria) that defines how rows can be grouped by that column. Order of groups follows the order of elements in the array.
- **id**: ID of the column used to group rows.
- **type**: one of ['match', 'range'].
  - 'match': react-mui-datagrid will find all unique values for that column among all the rows, and create one row group for each unique value. For example, if there are five countries exist among all the rows, five groups will be created where all rows in the same group contain the same country.
  - 'range': users need to provide begin-and-end value pairs in the criteria so that react-mui-datagrid can create one group of rows for each begin-and-end value pair.
- **criteria**: an array of begin-and-end value pairs, only applicable when type is 'range'. If both begin and end values are given, begin is exclusive, end is inclusive. If the begin value is not given, the group starts with the lowest value of all the rows. If the end value is not given, the group ends with the largest value of all the rows.

The following example defines a 4-level grouping, by columns 'country', 'city', 'birthDate' and 'asset', in that order.
```jsx
const groupColumns = [
  { id: 'country', type: 'match', criteria: [], },
  { id: 'city', type: 'match', criteria: [], },
  { id: 'birthDate', type: 'range', criteria: [ 
    { end: '1955-12-31' },
    { begin: '1955-12-31', end: '1990-12-31' },
    { begin: '1990-12-31' }, ]
  },
  { id: 'asset', type: 'range', criteria: [ 
    { end: 200000 },
    { begin: 200000, end: 2000000 },
    { begin: 2000000 }, ]
  },
];
```
#### 2. Pie chart data
Pie chart data is an object of per-column pie chart data, where the keys are column IDs. The per-column pie chart data contains legend and the data itself. Here is an illustration:
```jsx
{
  [column1.id]: {
    legends: {
      key1: {
        label: 'bond', // string
        unit: '%', // one of ['%', '$', 'EUR', etc.]
        dp: 2, // integer, number of decimal points in display
        color: '#e5e5e5', // color-encoding string, in the format of '#xxxxxx'
      }
    },
    data: {
      [row1.id] : [ // pie chart for row1
        {
          id: 'key1', // slice 1
          value: 98765.4321, // can be absolute number, react-mui-datagrid will translate it to percentage if unit is '%'.
          // also shown in each slice in pop up
          // `${legends[id].label}:${value}` shown in each slice in tooltip
        },
        ... // more slices
      ],
      [row2.id]: [...], // pie chart for row2
      ... // pie charts for more rows
    },
  },
  [column2.id]: {...}, // pie charts for column2
  ... // pie charts for more columns
}
```
Here is an example:
```jsx
{
    investments = {
        legends: {
            'cash': { label: 'Cash', unit: '%', dp: 2, color: '#9e9e9e' },
            'moneyMarket': { label: 'Money market', unit: '%', dp: 2, color: '#ff9800' },
            'bond': { label: 'Bond', unit: '%', dp: 2, color: '#009688' },
            'stock': { label: 'Stock', unit: '%', dp: 2, color: '#e91e63' },
        },
        data: {
            '1001': [{ id: 'cash', value: 54.2636, }, 
                     { id: 'moneyMarket', value: 246.2253, },
                     { id: 'bond', value: 144.4251, },
                     { id: 'stock', value: 61.1358, }, 
            ],
            // data for more rows ...
        },
    }
}
```
#### 3. Image data
React does not support dynamic 'require' or 'import' using variables. One way to work around the issue is to pre-load the images and assign them to variables.

First load the images using 'require':
```jsx
{
    avatars = {
        avatar0: require('./images/SampleAvatar0.png'),
        avatar1: require('./images/SampleAvatar1.png'),
    },
}
```
Or using 'import':
```jsx
import SampleAvatar0 from './images/SampleAvatar0.png';
import SampleAvatar1 from './images/SampleAvatar1.png';

const avatars = {
    avatar0: SampleAvatar0,
    avatar1: SampleAvatar1,
  };
```
Then assign the variable such as 'avatar1' to corresponding field in the row. If such variable does not match any preloaded images, the Datagrid shows "image missing" in the cell. If no variable is assigned to the field, the Datagrid shows empty cell.
```jsx
const rowData = [
  { id: "1153", firstName: "Shea", birthDate: "1981-06-07", email: "sborrel48@ameblo.jp", avatar: "avatar1", roles: ["Supplier", "Consumer", "Broker", ],  currency: "JPY", netAsset: 280742.82, investments: "(Pie chart: data missing)", mutable: false, },
  // other rows ...,
];
```
#### 4. Datagrid cascading
When a column of the Datagrid is of type object or array of objects, its edit type should be 'table', which means a second-level Datagrid will be deployed to edit values for that column. In that case, definition of that column needs to include a full set of column definitions for the second-level Datagrid.

Let's say values for column 'contacts' can be arrays of up to three elements, and each element contains the contact type ('Phone', 'Mobile', 'Fax') and the corresponding contact number. Definition of column 'contacts' will be something like these (note that 'title' is purposely left blank to avoid redundency):
```jsx
contacts: { name: 'Contacts', label: 'Contacts', type: 'array', edit: 'table', stat: false, required: false, sortable: true, width: '1.8em',
    meta: { facet: 'classic', size: 'regular', context: 'contact', title: '', desc: 'contact information', },
    columns: {
      id: { name: 'Id', label: 'ID', type: 'string', edit: false, stat: false, required: true, sortable: true, width: '1em', },
      type: { name: 'type', label: 'Type', type: 'string', edit: 'dropdown', stat: false, required: true, sortable: true, width: '1em',
        selector: {
            getOptionList() { return ['Phone', 'Mobile', 'Fax']; }
        },
      },
      contact: { name: 'contact', label: 'Contact', type: 'string', edit: 'text', stat: false, required: true, sortable: true, width: '1em', },
    },
    columnsHidden: ['id'],
    defaultRow: { type: 'Phone', contact: 'xxx-xxx-xxxx'},
},
```

Here is react-mui-datagrid with grouping, sorting and virtualization.
![react-mui-datagrid with grouping and virtualization](https://upload.wikimedia.org/wikipedia/commons/7/71/ScreenShot-react-mui-datagrid-7.png)

### User pluggins
#### 1. Attach data converter
Data conversion is transforming the data in the viewing mode. For example, we can change all non-USD currencies to USD so that all associated money amounts are transformed to be denominated in USD which make statistics more meaningful. To do that, we can define a currency converter and attach that to the 'currency' column definition.

Data converter needs to define two methods which are invoked internally by react-mui-datagrid: *getOptionList* and *handleConvert*.
```jsx
const handleRowTransform = (rowNew) => {
    // client code to update row data
  };
const currencies = {
    USD: 1,
    AUD: 0.71,
    EUR: 1.17,
    GBP: 1.28,
    JPY: 0.0095,
    RMB: 0.15,
    RUB: 0.013,
};
const currencyConverter = {
    convert(sourceAmount, source, target) {
        if (source === target) return sourceAmount;
        return (sourceAmount * currencies[source] / currencies[target]).toFixed(2) * 1.0;
    },
    getOptionList() { return Object.keys(currencies); },
    handleConvert(event, row) {
        const assetNew = this.convert(row.asset, row.currency, event.target.value);
        this.callback({ ...row, 
            currency : event.target.value,
            asset: assetNew,
        });
    },
  };
  currencyConverter.callback = handleRowTransform;
  columnData.currency.converter = currencyConverter;
```
#### 2. Attach data selector
Data selector provides the list of options that users can select from when updating the data. For example, a country selector can populate a country dropdown to let user choose a country, and a city selector can populate a city dropdown to let user choose a city. Furthermore, options in the city dropdown are dynamically created based on the country chosen by the user. Here is some sample user code to make that happen.

Data selector needs to define two methods which are invoked internally by react-mui-datagrid: *getOptionList* and *handleSelect*.
```jsx
const regionSelector = {
    regions: {
        'USA': ['Atlanta', 'Boston', 'Dallas', 'Denver', 'Los Angales', 'New York'],
        'Australia': ['Melbourne', 'Sydney'],
        'China': ['Beijing', 'Shanghai', 'Hongkong'],
        'Graman': ['Berlin', 'Frankfurt', 'Munich'],
        'Spain': ['Barcelona', 'Granada', 'Madrid'],
        'Japan': ['Kyoto', 'Osaka', 'Tokyo'],
        'Russia': ['Moscow', 'Saint Petersburg'],
        'England': ['Liverpool', 'London', 'Manchester'],
    },
    currentKey: null,
    getKeys() { return Object.keys(this.regions); },
    setKey(key) { this.currentKey = key; },
    getValues() { return this.currentKey ? this.regions[this.currentKey] : []; },
};
  
const countrySelector = {
    getOptionList() { return regionSelector.getKeys(); },
    handleSelect(value) { regionSelector.setKey(value); },
}
columnData.country.selector = countrySelector;

const citySelector = {
    getOptionList() { return regionSelector.getValues(); }
}
columnData.city.selector = citySelector;
```

## License
MIT © [](https://github.com/)
