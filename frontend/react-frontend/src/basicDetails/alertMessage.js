import React from 'react'
import Alert from '@mui/material/Alert';
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';





export default function AlertMessage({passedAlertMessage}) {
  // let style="success";
  const [style, setStyle] = React.useState("success");

  const [alertStatus, setAlertStatus] = React.useState(false);
  console.log(passedAlertMessage)

  React.useEffect(() => {
    if(passedAlertMessage.message!=null && passedAlertMessage.type!=null){
      if(passedAlertMessage.type=="buy"){
        setStyle("success")
        setAlertStatus(true)
      }
      else{
        setStyle("error")
        setAlertStatus(true)
      }
    }
    else{
      return
    }
  }, [passedAlertMessage]); 

  const handleAlertMessageStatus =(status)=>{

    setAlertStatus(status)

  }


  return (
    
    <Stack sx={{ width: '60%' }} spacing={1}>
      {alertStatus?
        <Alert icon={false} severity={style} onClose={() => {handleAlertMessageStatus(false)}}>
          {passedAlertMessage.message}
        </Alert>
        :null}
    </Stack>
  )
}
