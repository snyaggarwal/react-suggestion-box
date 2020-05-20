# react-suggestion-box
Material-ui based react user suggestions/feedback/complaints dialog box with screenshot.


[![NPM](https://img.shields.io/npm/v/react-suggestion-box.svg)](https://www.npmjs.com/package/react-suggestion-box)


## Installation
react-suggestion-box is available as an npm package.

```
// with npm
npm install --save react-suggestion-box

// with yarn
yarn add react-suggestion-box

```

## Usage

```jsx
import React from 'react';
import ReactSuggestionBox from 'react-suggestion-box';

export default class MySuggestionComponent extends React.Component {
  onSubmit = data => {
  }

  render() {
    return (
      <ReactSuggestionBox onSubmit={this.onSubmit} />
    );
  }
}

```

## Props
| Name                    | Type           | Default           | Description                     |
| -------------           |:-------------:| -----:             | -----:                          |
| containerClassName      | string         |                   | Component DOM container class   |
| buttonTooltipText       | string         | "Suggestion"      | Suggestion Button Tooltip Text  |
| mainButtonLabel         | string         | "Suggestion"      | Suggestion Button Label         |
| title                   | string         | "Send Suggestion" | Dialog title          |
| descriptionPlaceholder  | string         | "Describe your issues or share your ideas" | Dialog description field placeholder |
| cancelButtonLabel       | string         | "Cancel"          | Dialog Cancel button label          |
| submitButtonLabel       | string         | "Send"            | Dialog Submit button label          |
| onSubmit                | func           |                   | Dialog onSubmit handler (Mandatory) |

## Screenshot
![alt text](https://github.com/snyaggarwal/react-suggestion-box/blob/master/screenshots/FullPage.png?raw=true)

