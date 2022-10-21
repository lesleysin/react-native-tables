# Global options

If you are using this library to render multiple tables on different screens in your application, you may run into the problem of having to define the component's configuration on a case-by-case basis. This package provides the ability to globally configure all table components using the `TableStatic` object.

```typescript
export interface CellViewProps {
  cellHighligntBackgroundColor?: string;
  longPressDelay?: number;
}

export interface HeaderCellProps {
  firstCellStyle?: ViewStyle;
  lastCellStyle?: ViewStyle;
  defaultCellStyle?: ViewStyle;
}
export interface ITableStaticProps {
  numericCellTextStyle?: TextStyle;
  stringCellTextStyle?: TextStyle;
  linkCellTextStyle?: TextStyle;
  dateCellTextStyle?: TextStyle;
  headerCellTextStyle?: TextStyle;
  cellContainerStyle?: ViewStyle & CellViewProps;
  headerCellContainerStyle?: HeaderCellProps;
  columnContainerStyle?: ViewStyle;
  horizontalScrollViewProps?: ScrollViewProps;
  verticalScrollViewProps?: ScrollViewProps;
}
declare class TableStatic implements ITableStaticProps {
  static numericCellTextStyle: TextStyle;
  static stringCellTextStyle: TextStyle;
  static linkCellTextStyle: TextStyle;
  static dateCellTextStyle: TextStyle;
  static headerCellTextStyle: TextStyle;
  static cellContainerStyle: ViewStyle & CellViewProps;
  static headerCellContainerStyle: HeaderCellProps;
  static columnContainerStyle: ViewStyle;
  static horizontalScrollViewProps: ScrollViewProps;
  static verticalScrollViewProps: ScrollViewProps;
  static enableHorizontalScroll: boolean;
  static format?: DateTimeFormat;
  static locale?: AvailableLocales;
  static customFormattingPattern?: string;
  /**
   * @internal
   */
  static clear(): void;
  static create(args: ITableStaticProps): void;
}
```

Via TableStatic.create method you can you can assign properties to many table elements independently:

```typescript
TableStatic.create({
  headerCellContainerStyle: {
    firstCellStyle: {
      backgroundColor: 'red',
    },
    defaultCellStyle: {
      backgroundColor: 'green',
    },
  },
  stringCellTextStyle: {
    color: 'gray',
    fontSize: 16,
  },
});
```

or for a single property

```typescript
TableStatic.dateCellTextStyle = {
  color: 'black',
};
```

## Property override priorities

Global props assigned via TableStatic, component props and internal properties are assigned to components in that order (to increase priority).

```
Internal props => component props => TableStatic props
```

This means that the TableStatic properties always take precedence over the rest when and overwrite any properties that have been assigned

### Example

```typescript
TableStatic.create({
  stringCellTextStyle: {
    color: 'black',
  },
});

const App = () => {
  return (
    <SafeAreaView>
      <Table config={talbeConfig} data={tableData} stringCellTextStyle={{ color: 'red' }} />
    </SafeAreaView>
  );
};
```

As a result, the text color for a cell of type "string" will be black
