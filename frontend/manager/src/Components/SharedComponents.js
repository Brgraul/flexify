import styled from 'styled-components';
import {Grid, Button} from '@material-ui/core';

export const CheckTitle = styled.h3`
    margin: 0;
`;

export const CheckSubTitle = styled.h4`
    margin : 0;
    text-transform: uppercase;
    font-weight: 400;
    font-size: 0.8rem;
`;

export const CheckSubTitleNoUp = styled.h4`
    margin : 0;
    font-weight: 400;
    font-size: 0.8rem;
`;

export const SubHeader = styled.h4`
    font-weight: 500;
    font-size: 0.8rem;
    text-transform: uppercase;
    margin-bottom: 1.5%;
    margin-top: 0;
`
export const Header = styled.h2`
    margin-top: 0;
    margin-bottom: 3%;
`

export const GridMargin = styled(Grid)`
    &&{
    margin-top: 3%;
    margin-bottom: 3%;
    }
`

export const BottomButton = styled(Button)`
    &&{
      min-width: 100%;
      margin: 0;
      border-radius: 0;
      position: fixed;
      bottom: 0;
      height: 7%;
    } 
`
export const CroppingDiv = styled.div`
  overflow:hidden;
  margin: 0;
  max-height:30vh;
`