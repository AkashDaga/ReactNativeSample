import { StyleSheet } from 'react-native';
import theme from './themeStyle.js';

export default StyleSheet.create({
  pageContainer: {
    flex: 1,
    backgroundColor: theme.PAGE_BACKGROUND,
    padding: theme.SPACE_LARGE,
    margin: theme.SPACE_LARGE
  },
  borderContainer: {
    borderWidth: 1,
    borderColor: theme.BORDER_COLOR
  },
  smallText: {
    fontSize: theme.FONT_SIZE_SMALL
  },
  mediumText: {
    fontSize: theme.FONT_SIZE_MEDIUM
  },
  headerText: {
    fontSize: theme.FONT_SIZE_LARGE
  },
  lightTxt: {
    color: theme.LIGHT_TXT_COLOR
  },
  mediumTxt: {
    color: theme.MEDIUM_TXT_COLOR
  },
  darkTxt: {
    color: theme.DARK_TXT_COLOR
  },
  textAlignCen: {
    textAlign: 'center'
  },
  textAlignLeft: {
    textAlign: 'left'
  },
  pageTitleText: {
    fontSize: theme.FONT_SIZE_XXLARGE
  },
  pageTitleTextWithSpace: {
    fontSize: theme.FONT_SIZE_XXLARGE,
    marginVertical: theme.SPACE_LARGE
  },
  headingTextStyle: {
    fontSize: theme.FONT_SIZE_LARGE
  },
  subTitletext: {
    fontSize: theme.FONT_SIZE_MEDIUM
  },
  subTitletextWithSpace: {
    fontSize: theme.FONT_SIZE_MEDIUM,
    marginTop: theme.SPACE_LARGE,
    marginBottom: theme.SPACE_SMALL
  }
});
