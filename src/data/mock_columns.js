const columns = {
  id: { name: 'Id', label: 'ID', type: 'string', edit: false, stat: false, required: true, sortable: true, width: '1em', },
  country: { name: 'Country', label: 'Country', type: 'string', edit: 'dropdown', stat: 'distinct', required: true, sortable: true, width: '1em', },
  city: { name: 'City', label: 'City', type: 'string', edit: 'dropdown', stat: 'distinct', required: true, sortable: true, width: '1em', },
  suffix: { name: 'Suffix', label: 'Suffix', type: 'string', edit: 'radio', stat: false, required: true, sortable: true, width: '0.4em', },
  firstName: { name: 'FirstName', label: 'First Name', type: 'string', edit: 'text', stat: false, required: true, sortable: true, width: '1em', },
  lastName: { name: 'LastName', label: 'Last Name', type: 'string', edit: 'text', stat: false, required: true, sortable: true, width: '1em', },
  gender: { name: 'Gender', label: 'Gender', type: 'string', edit: 'radio', stat: 'count', required: true, sortable: true, width: '0.6em', },
  birthDate: { name: 'BirthDate', label: 'Birth Date', type: 'date', edit: 'date', stat: false, required: true, sortable: true, width: '0.8em', },
  email: { name: 'Email', label: 'Email', type: 'email', edit: 'text', stat: 'distinct', required: true, sortable: true, width: '1.6em', },
  avatar: { name: 'Avatar', label: 'Avatar', type: 'image', edit: false, stat: false, required: false, sortable: false, width: '0.6em', },
  roles: { name: 'Roles', label: 'Roles', type: 'array', edit: 'dropdown', stat: false, required: true, sortable: true, width: '0.8em', },
  contacts: { name: 'Contacts', label: 'Contacts', type: 'array', edit: 'table', stat: false, required: false, sortable: true, width: '1.8em',
    meta: { facet: 'classic', size: 'regular', context: 'contact', title: '', desc: 'contact information' },
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
    groupColumns: [],
    defaultRow: { type: 'Phone', contact: 'xxx-xxx-xxxx'},
  },
  currency: { name: 'Currency', label: 'Currency', type: 'string', edit: 'dropdown', stat: 'distinct', required: false, sortable: true, width: '0.6em'},
  asset: { name: 'Asset', label: 'Asset', type: 'numeric', edit: 'text', stat: 'sum', required: false, sortable: true, width: '1em', },
  debt: { name: 'Debt', label: 'Debt', type: 'numeric', edit: 'text', stat: 'sum', required: false, sortable: true, width: '1em', },
  netAsset: { name: 'NetAsset', label: 'Net Asset', type: 'numeric', edit: 'text', stat: 'avg', required: false, sortable: true, width: '1em', },
  investments: { name: 'Investments', label: 'Investments', type: 'pieChart', edit: false, stat: 'sum', required: false, sortable: false, width: '1em',
    // meta: { facet: 'classic', size: 'regular', context: 'contact', title: 'Investments', desc: 'investments' },
    // columns: {
    //   id: { name: 'Id', label: 'ID', type: 'string', edit: false, stat: false, required: true, sortable: true, width: '1em', },
    //   title: { name: 'title', label: 'Category', type: 'string', edit: 'dropdown', stat: false, required: true, sortable: true, width: '1em',
    //     selector: {
    //       getOptionList() { return ['Cash', 'Money Market', 'Bond', 'Stock']; }
    //     },
    //   },
    //   value: { name: 'value', label: 'Value', type: 'numeric', edit: 'text', stat: 'sum', required: true, sortable: true, width: '1em', },
    //   color: { name: 'color', label: 'Color', type: 'string', edit: 'text', stat: false, required: true, sortable: false, width: '1em', },
    // },
    // columnsHidden: ['id'],
    // groupColumns: [],
    // defaultRow: { title: 'Cash', value: 0, color: '#9e9e9e' },
  },
};

const columnsHidden = ['id', 'country', 'city', 'suffix', 'gender', 'asset', 'debt', ];

const groupColumns = [
  { id: 'country', type: 'match', criteria: [], },
  { id: 'city', type: 'match', criteria: [], },
  { id: 'birthDate', type: 'range', criteria: [ { end: '1955-12-31' },
                                                { begin: '1955-12-31', end: '1990-12-31' },
                                                { begin: '1990-12-31' }, ]
  },
  { id: 'asset', type: 'range', criteria: [ { end: 200000 },
                                            { begin: 200000, end: 2000000 },
                                            { begin: 2000000 }, ]
  },
];

module.exports = { columns, columnsHidden, groupColumns };