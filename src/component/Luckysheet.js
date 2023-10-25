import React, { useRef, useState, useEffect } from "react";
import { luckyToExcel } from "../luckyToExcel";
import sheetData from "../sheetData";
import "./App.css";

const Luckysheet = () => {
  const [data, setData] = useState([sheetData]);
  const containerRef = useRef();

  useEffect(() => {
    if (containerRef.current) {
      if (data instanceof File) {
        window.LuckyExcel.transformExcelToLucky(
          data,
          function (exportJson, luckysheetfile) {
            createSheet(exportJson.sheets);
          },
          function (err) {
            console.error("Import failed. Is your fail a valid xlsx?");
          }
        );
      } else {
        createSheet(data);
      }
    }
  }, [data]);

  const readFile = (e) => {
    let files = e.target.files;
    if (files) {
      setData(files[0]);
    }
  };

  const createSheet = (data) => {
    let options = {
      container: "luckysheet",
      showinfobar: false,
      showsheetbar: true,
      enableAddRow: false,
      showtoolbar: true,
      gridKey: "xxxx",
      allowUpdate: false,
      enableAddBackTop: false,
      lang: "en",
    };

    if (data) {
      options.data = data;
    }

    window.luckysheet.create(options);
  };

  const exportToExcel = () => {
    luckyToExcel(window.luckysheet, "excel-sheet");
  };

  const getData = () => {
    let arr = window.luckysheet.getSheet();
    console.log(arr);
  };

  return (
    <div>
      <input type="file" name="upload" id="upload" onChange={readFile} />
      <button onClick={exportToExcel}>Export</button>
      <button onClick={getData}>Get Data</button>
      <div id="luckysheet" className="App" ref={containerRef}></div>
    </div>
  );
};

export default Luckysheet;
