import React from 'react';
import { makeStyles, createStyles, Theme } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';

interface MyTheme extends Theme {}

const useStyles = makeStyles((theme: MyTheme) =>
  createStyles({
    root: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      minHeight: "576px",
    },
    paper: {
      textAlign: 'center',
      padding: theme.spacing(2),
    },
    image: {
      maxWidth: '100%',
      height: 'auto',
    },
  })
);

interface CenteredImageProps {
  sword: string;
}

const CenteredImage: React.FC<CenteredImageProps> = ({ sword }) => {
  const classes = useStyles();

  return (
    <Container className={classes.root}>
      <img src={sword} alt="" className={classes.image} />
    </Container>
  );
};

export default CenteredImage;
