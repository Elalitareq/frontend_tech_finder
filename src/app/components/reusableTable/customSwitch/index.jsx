import { Switch } from "@mui/material"

export default CustomSwitch=({checked,handleSwitchChange,id})=>{
    const [sure,setSure]=useState(checked)
    useEffect(
  
    )
    return(
      <Switch
     checked={sure}
     onChange={(e,value) => {
      setSure(value)
      handleSwitchChange(id, value);
    }}
    />
    )
  }