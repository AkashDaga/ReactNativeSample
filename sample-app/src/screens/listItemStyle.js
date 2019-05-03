import { StyleSheet } from 'react-native';
import theme from '../styles/themeStyle';

export const styles = StyleSheet.create({
  cardStyle: {
    flex: 1,
    backgroundColor: theme.WHITE_COLOR,
    margin: 0,
    padding: 5
  },
  insideStyle: {
    padding: 2
  },
  circleStyle: {
    width: 40,
    height: 40,
    borderRadius: 40 / 2,
    alignItems: 'center',
    justifyContent: 'center'
  },
  container: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 6
  },
  textAndImageSideBySideStyle: {
    alignItems: 'center',
    flexDirection: 'row'
  },
  avtarContainer: {
    flexDirection: 'column',
    alignItems: 'center'
  },
  infoContainer: {
    flex: 1,
    marginLeft: 10,
    justifyContent: 'flex-start',
    flexDirection: 'column'
  },
  actionsContainer: {
    flexDirection: 'column',
    alignItems: 'flex-end',
    justifyContent: 'space-between'
  },
  titleTextActiveStyle: {
    fontSize: theme.FONT_SIZE_LARGE
  },
  titleTextDeAactiveStyle: {
    fontSize: theme.FONT_SIZE_LARGE,
    color: theme.MEDIUM_TXT_COLOR
  },
  deAactiveTextStyle: {
    color: theme.MEDIUM_TXT_COLOR
  },
  deAactiveTextStyleWithMargin: {
    color: theme.MEDIUM_TXT_COLOR,
    marginBottom: 0
  },
  sideBySideStyle: {
    alignItems: 'center',
    flexDirection: 'row'
  },
  orangeBackgroundStyle: {
    marginTop: 5,
    paddingLeft: 2,
    paddingRight: 2,
    borderWidth: 1,
    backgroundColor: theme.ORANGE_COLOR,
    borderColor: theme.WHITE_COLOR,
    alignItems: 'center',
    justifyContent: 'center',
    borderBottomLeftRadius: 7,
    borderBottomRightRadius: 7,
    borderTopLeftRadius: 7,
    borderTopRightRadius: 7,
    minWidth: 40
  },
  tagStyle: {
    color: theme.ORANGE_COLOR,
    fontSize: theme.FONT_SIZE_XSMALL,
    marginLeft: 5,
    fontWeight: 'bold'
  },
  iconPadding: {
    padding: 10,
    borderRadius: 100,
    marginRight: -10,
    marginBottom: -7
  },
  blueAndBoldText: {
    color: theme.SECONDARY_COLOR,
    fontSize: theme.FONT_SIZE_MEDIUM,
    fontWeight: 'bold'
  },
  remiderCountStyle: {
    color: theme.MEDIUM_TXT_COLOR,
    fontSize: theme.FONT_SIZE_SMALL
  }
});
