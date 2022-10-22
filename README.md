# react-native-tables

[![npm version](https://badge.fury.io/js/@lesleysin%2Freact-native-tables.svg)](https://badge.fury.io/js/@lesleysin%2Freact-native-tables) [![GitHub license](https://img.shields.io/github/license/Naereen/StrapDown.js.svg)](https://github.com/Naereen/StrapDown.js/blob/master/LICENSE)

Simple and fast table component for React Native with extensive configuration options

## Motivation

This library was created to facilitate the work of colleagues who are faced with such a non-trivial task as creating tables for a mobile application. You can use this package or build on this source code to create your own solutions.

## Get started

```
yarn add @lesleysin/react-native-tables
```

or via npm

```
npm i @lesleysin/react-native-tables
```

## Basic use case

```Typescript
import React from 'react';
import {SafeAreaView, StyleSheet} from 'react-native';

import {Table} from '@lesleysin/react-native-tables';

const talbeConfig = [
  {type: 'string', title: 'Column 1'},
  {type: 'string', title: 'Column 2'},
  {type: 'string', title: 'Column 3'},
];

const tableData = [
  ['string1', 'string2', 'string3'],
  null, //null values in data array creates empty cells in that column
  ['val', null, 'value'],
];

const App = () => {
  return (
    <SafeAreaView>
      <Table config={talbeConfig} data={tableData} />
    </SafeAreaView>
  );
};
```

## Documentation

Learn more about advanced usage and type definitions here https://github.com/lesleysin/react-native-tables/tree/main/doc
