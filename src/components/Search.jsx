import React, { useEffect } from "react";
import { useLocation } from "react-router-dom";
import Typography from "@material-ui/core/Typography";
import CompanyCards from "./company/CompanyCards";
import fakeData from '../data/fakeData'


export default function Search(props) {
  const [currentCards, setCurrentCards] = React.useState([]);
  const [err, setErr] = React.useState(false);
  const location = useLocation();
  const url = new URLSearchParams(location.search);
  const q = url.get("q");
  useEffect(() => {
    let query = q.charAt(0).toUpperCase() + q.slice(1);
    fakeData.map(data=>{
      if(data.company==query){
        setCurrentCards([data])
        setErr(false)
      }else{
        setErr(true)
      }
    })
    
  })
  return (
    <>
      <Typography
        component="h4"
        variant="h4"
        color="primary"
        style={{ textAlign: "center" }}
      >
        {q.charAt(0).toUpperCase() + q.slice(1)}
        <br/>
        <br/>
        {currentCards.length>0?"":"Unfortunately, We could no find your search :("}
      </Typography>

      {/* Map Company Cards */}
      <CompanyCards cards={currentCards} />
    </>
  );
}
