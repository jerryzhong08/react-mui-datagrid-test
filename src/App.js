import React from 'react';

import { columns, columnsHidden, groupColumns } from './data/mock_columns';
import { users } from './data/mock_users';
import { investments } from './data/mock_pie_charts';

import { Datagrid } from 'react-mui-datagrid';

import SampleAvatar0 from './images/SampleAvatar0.png';
import SampleAvatar1 from './images/SampleAvatar1.png';
import SampleAvatar2 from './images/SampleAvatar2.png';
import SampleAvatar3 from './images/SampleAvatar3.png';
import SampleAvatar4 from './images/SampleAvatar4.png';
import SampleAvatar5 from './images/SampleAvatar5.png';
import SampleAvatar6 from './images/SampleAvatar6.png';
import SampleAvatar7 from './images/SampleAvatar7.png';
import SampleAvatar8 from './images/SampleAvatar8.png';
import SampleAvatar9 from './images/SampleAvatar9.png';
import SampleAvatar10 from './images/SampleAvatar10.png';
import SampleAvatar11 from './images/SampleAvatar11.png';
import SampleAvatar12 from './images/SampleAvatar12.png';

const avatars = {
  avatar0: SampleAvatar0,
  avatar1: SampleAvatar1,
  avatar2: SampleAvatar2,
  avatar3: SampleAvatar3,
  avatar4: SampleAvatar4,
  avatar5: SampleAvatar5,
  avatar6: SampleAvatar6,
  avatar7: SampleAvatar7,
  avatar8: SampleAvatar8,
  avatar9: SampleAvatar9,
  avatar10: SampleAvatar10,
  avatar11: SampleAvatar11,
  avatar12: SampleAvatar12,
};

const rowDefault = {
  suffix: 'Mr.',
  firstName: '',
  lastName: '',
  email: '',
  birthDate: '',
  gender: 'Male',
  roles: ['Supplier'],
  contacts: [],
  country: '',
  city: '',
  currency: 'USD',
  asset: 0,
  debt: 0,
  netAsset: 0,
};

const currencies = {
  USD: 1,
  AUD: 0.71,
  BRL: 0.18,
  CZK: 0.043,
  DKK: 0.16,
  ECD: 0.37,
  EUR: 1.17,
  GBP: 1.28,
  HKD: 0.13,
  JPY: 0.0095,
  LYD: 0.73,
  RMB: 0.15,
  RUB: 0.013,
  TVD: 0.74,
};

const currencyConverter = {
  convert(sourceAmount, source, target) {
    if (source === target) return sourceAmount;
    return (sourceAmount * currencies[source] / currencies[target]).toFixed(2) * 1.0;
  },
  getOptionList() { return Object.keys(currencies); },
  handleConvert(event, row) {
    const assetNew = this.convert(row.asset, row.currency, event.target.value);
    const debtNew = this.convert(row.debt, row.currency, event.target.value);
    const netAssetNew = this.convert(row.netAsset, row.currency, event.target.value);
    this.callback({ ...row, 
      currency : event.target.value,
      asset: assetNew,
      debt: debtNew,
      netAsset: netAssetNew,
    });
  },
};

const regionSelector = {
  regions: {
    'USA': ['Atlanta', 'Boston', 'Dallas', 'Denver', 'Los Angales', 'New York'],
    'Australia': ['Melbourne', 'Sydney'],
    'Brazil': ['Rio de', 'Sao Paulo'],
    'Switzerland': ['Basel', 'Geneva', 'Zurich'],
    'China': ['Beijing', 'Shanghai', 'Hongkong'],
    'Czechia': ['Brno', 'Prague'],
    'German': ['Berlin', 'Frankfurt', 'Munich'],
    'Spain': ['Barcelona', 'Granada', 'Madrid'],
    'France': ['Marseille', 'Nice', 'Paris'],
    'Greenland': ['Nuuk','Sisimiut'],
    'Italy': ['Florence', 'Milan', 'Rome'],
    'Grenada': ['Bogles', 'Tivoli'],
    'Japan': ['Kyoto', 'Osaka', 'Tokyo'],
    'Libya': ['Benghzai', 'Tripoli'],
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

const citySelector = {
  getOptionList() { return regionSelector.getValues(); }
}

const suffixSelector = {
  getOptionList() { return ['Mr.', 'Mrs.']; },
};

const genderSelector = {
  getOptionList() { return ['Male', 'Female', 'Other']; },
};

const currencySelector = {
  getOptionList() { return Object.keys(currencies); },
};

const rolesSelector = {
  getOptionList() { return ['Supplier', 'Consumer', 'Broker']; },
};

const contactsSelector = {
  getOptionList() { return ['Mobile', 'Office', 'Fax']; },
};

export default function App() {

  // s_users store the original data and are affected by user changes (add, delete, update)
  const [s_users, setUsers] = React.useState(users.slice(0, 1000));
  // s_convertedRows reflect data conversion made to certain rows (e.g. currency convert)
  const [s_convertedRows, setConvertedRows] = React.useState([s_users[0]]);
  const [s_columnInfo, setColumnInfo] = React.useState({
    columns: columns,
    columnsHidden: columnsHidden,
    // columnsHidden: [],
    groupColumns: groupColumns,
    // groupColumns: [],
  });

  const handleSettingsUpdate = (columns, columnsHidden, groupColumns) => {
    setColumnInfo({
      columns: columns,
      columnsHidden: columnsHidden,
      groupColumns: groupColumns,
    });
  }
  
  const handleUserAdd = (rowNew) => {
    const userNew = Object.keys(s_columnInfo.columns).reduce((acc, key) => {
      acc[key] = rowNew[key];
      return acc;
    }, { mutable: true });
    const usersNew = [...s_users, userNew];
    setUsers(usersNew);
  }

  const handleUserUpdate = (rowNew) => {
    const indexFound = s_users.findIndex(user => user.id === rowNew.id);
    if (indexFound !== -1) {
      const userNew = Object.keys(s_columnInfo.columns).reduce((acc, key) => {
        acc[key] = rowNew[key];
        return acc;
      }, { mutable: true });
      const usersNew = [
        ...s_users.slice(0, indexFound),
        userNew,
        ...s_users.slice(indexFound + 1)
      ];
      const convertedRowsNew = s_convertedRows.filter(row => row.id !== rowNew.id);
      setUsers(usersNew);
      setConvertedRows(convertedRowsNew);
    }
  }

  const handleUserDelete = (rowId) => {
    const usersNew = s_users.filter(user => user.id !== rowId);
    const convertedRowsNew = s_convertedRows.filter(row => row.id !== rowId);
    setUsers(usersNew);
    setConvertedRows(convertedRowsNew);
  }

  const handleRowConvert = (rowNew) => {
    const convertedRowsNew = s_convertedRows.filter(row => row.id !== rowNew.id);
    setConvertedRows([rowNew, ...convertedRowsNew]);
  };

  // Eliminate all conversion made to the data
  const handleRowRefresh = () => {
    setConvertedRows([]);
  };

  const mergeWithConvertedRows = (users, convertedRows) => {
    const convertedRowMap = convertedRows.reduce((acc, row) => {
      acc[row.id] = row;
      return acc;
    }, {})
    return users.reduce((acc, user) => {
      if (user.id in convertedRowMap) acc.push(convertedRowMap[user.id]);
      else acc.push(user);
      return acc;
    }, []);
  };

  // const mergedRows = mergeWithConvertedRows(s_users, s_convertedRows);
  const mergedRows = React.useMemo(
    () => {
      return mergeWithConvertedRows(s_users, s_convertedRows)
    }, [s_users, s_convertedRows]
  );

  // Attach converters
  currencyConverter.callback = handleRowConvert;
  s_columnInfo.columns.currency.converter = currencyConverter;
  
  // Attach selectors
  s_columnInfo.columns.country.selector = countrySelector;
  s_columnInfo.columns.city.selector = citySelector;
  s_columnInfo.columns.suffix.selector = suffixSelector;
  s_columnInfo.columns.gender.selector = genderSelector;
  s_columnInfo.columns.currency.selector = currencySelector;
  s_columnInfo.columns.roles.selector = rolesSelector;
  s_columnInfo.columns.contacts.selector = contactsSelector;

  return (
    <div style={{ margin: '1rem' }}>
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
        columns={s_columnInfo.columns}
        columnsHidden={s_columnInfo.columnsHidden}
        groupColumns={s_columnInfo.groupColumns}
        defaultRow={rowDefault}
        // defaultRow={{}}
        rows={mergedRows}
        pieCharts={{ 'investments': investments }}
        images={{ 'avatar': avatars }}
        // rowsPerPageOptions={[15, 25, 50]}
        virtualization={{ rowHeight: 40 }}
        showStats={'top'}
        onRowUpdated={handleUserUpdate}
        onRowDeleted={handleUserDelete}
        onSettingsUpdated={handleSettingsUpdate}
        onRowAdded={handleUserAdd}
        onRowRefresh={handleRowRefresh}
        enableExport={true}
        showTopToolbar={true}
      />
    </div>
  );
}