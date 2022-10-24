# Sorting data in a table

In order for the values in the column to be sortable, set the isSortable=true prop when creating the table configuration

```typescript
const talbeConfig: ColumnOptions[] = [
  { type: 'link', title: 'Column 1' },
  {
    type: 'string',
    title: 'Column 2',
    isSortable: true,
    sortIcon: <View style={{ height: 10, width: 10, backgroundColor: 'red', marginLeft: 10 }} />,
  },
  { type: 'string', title: 'Column 3' },
  { type: 'string', title: 'Column 3' },
];
```

By default, a column for which it is possible to sort values does not have its own sort icon. You can add it yourself with the sortIcon prop, which takes an object of type ReactNode

## Features of complex values sorting

ComplexValue class is a special data type that allows you to transfer not only values of primitive types, but also complex objects as data roles for a table. To display and further sort such objects, the ComplexValue class is used, which contains the target object itself and the names of the object property that will be used to display and sort in the future

```typescript
class ComplexValue {
  value: Object;
  viewablePropName: string;

  constructor(value: Object, viewablePropName: string) {
    this.value = value;
    this.viewablePropName = viewablePropName;
  }
}
```
