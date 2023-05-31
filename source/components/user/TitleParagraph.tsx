import React from 'react';
import { Grid } from '../Grid';
import { Typography } from '../Typography';


type TitleParagraphProps = {
    title: string;
    paragraph: string;
}

export const TitleParagraph = ({ title, paragraph }: TitleParagraphProps) => {
  return (
    <Grid display='flex' alignItems='center' width='100%' justifyContent='center' marginBottom={25}>
        <Typography size='md' fontFamily='Poppins-Medium' color='mineShaft' >{title}</Typography>
        <Typography size='sm' fontFamily='Poppins-Regular' color='tundora' styles={{width: '70%', textAlign:'center'}}>{paragraph}</Typography>
    </Grid>
  )
}
