import { makeStyles } from "@material-ui/core/styles";


export const useStyles = (styles:Record<string, any>)=>{
    const result = makeStyles(styles);
    return result()
}