# React Date Picker from Scratch

[React Date Picker W](http://react-day-picker.js.org/) is a date picker component for [React](https://reactjs.org/). Renders an input and a calendar. This components is customizable, easy to use and can be styled to match any design.

## Main features

- ☀️ Select a day
- 🧘‍♀️ using [date-fns](http://date-fns.org/) as date library
- 🌎 Localizable into any language
- ➡️ Keyboard navigation for certain part of the component
- 🤖 Written in TypeScript
- :police_car: Easy to style and customize
- 📄 Easy to integrate

## Installation

npm install react-day-picker date-fns # using npm
pnpm install react-day-picker date-fns # using pnpm
yarn add react-day-picker date-fns # using yarn

## Example

```javascript
import React from 'react';
import { format } from 'date-fns';
import { DayPicker } from 'react-day-picker';
import 'react-day-picker/dist/style.css';
export default function Form() {
	const [selected, setSelected] = React.useState<Date>();
    return (
        <DatePicker
        id="dateOfBirth"
        value={selectedDate}
        onChange={setSelectedDate}
        formatDate={FORMAT_OF_DATE}
        maxDate={new Date(2027, 2, 22)}
        name="myBeautifulDatePicker"
        ariaRequired={true}
        iso={true}
        />);
        }
```

|  Prop name   |             Type             |                     Description                     | Default value/optionnal |     Example values     | required |
| :----------: | :--------------------------: | :-------------------------------------------------: | :---------------------: | :--------------------: | :------: |
|      id      |            string            |                 the id of the input                 |          none           |   "datepicker-input    |   true   |
|    value     |             Date             |                the value of the date                |          none           |       new Date()       |   true   |
|   onChange   | <React.SetStateAction<Date>> | The setter of the date inside the higher component  |          none           |    setSelectedDate     |   true   |
|   minDate    |             Date             |                    The min date                     |        optionnal        | new Date(2012, 9, 10)  |  false   |
|   maxDate    |             Date             |                    The max date                     |        optionnal        | new Date(2022, 10, 10) |  false   |
| placeholder  |            string            |     the placerholder of the input text element      |        optionnal        |      "2010-4-22"       |  false   |
|  formatDate  |            string            | the format of the date to be formated with date fns |      "yyyy-MM-dd"       |      "yyyy-L-dd"       |   true   |
|     name     |            string            |                    name of input                    |          none           |    "date of birth"     |   true   |
| ariaRequired |           boolean            |               is this input required                |        optionnal        |       false/true       |  false   |
|     iso      |           boolean            |        local date begin on sunday or monday?        |        optionnal        |       false/true       |  false   |
|  formatDay   |            string            |             the format of the day input             |          Text           |        And more        |  false   |
| formatMonth  |            string            |              the format of the months               |          "LLL"          |         "LLL"          |  false   |
|  formatYear  |            string            |               the format of the years               |         "yyyy"          |         "yyyy"         |  false   |
|  ariaLabels  |          AriaLabels          |           the aria labels to be displayed           |        see below        |       see below        |  false   |
|    styles    |           IStyles            |              the styles to be applied               |        see below        |       see below        |  false   |
|  withPrefix  |           boolean            |       display the prefix days in the calendar       |          true           |          true          |  false   |
|  withSuffix  |           boolean            |       display the suffix days in the calendar       |          true           |          true          |  false   |

## i18n

Different language and date formats are supported by react-datetime. React uses [date-fns](http://date-fns.org/) to format the dates, and the easiest way of changing the language of the calendar is [changing the date fns locale]

Don't forget to import your locale file from the date fns library `date-fns/locale` folder.

```javascript
import { setDefaultOptions } from "date-fns";
import { fr, enUS } from "date-fns/locale";
//On top of the file set the locale option like this:
setDefaultOptions({ locale: fr });
```

Now react-datetime will be in french

## Customize the Appearance

There is two ways to style elements in the calendar.

The first way is by playing with the classes.
The second way is by providing the DatePicker component an object called styles.

I) Classes.

to customize the color, you set two keys inside the styles object:
primarycolor and secondarycolor

```typescript
const styles: IStyles = {
  primarycolor: "#54a0ff",
  secondarycolor: "#DB5461",
  inputStyles: {},
  arrowButton: {
    size: "3rem",
  },
};
```

If you want to style the arrow buttons to go to the next or previous year/month you can set the key size like above.
Other keys:

1. inputStyles: style the main inpux text that is displaying the date in a text format
2. arrowButton: will style the button that look like arrows in the calendar.
3. customSelect: will style the button "Month" and "Year"
4. inputStyles
5. inputStyles
6. inputStyles
7. inputStyles
