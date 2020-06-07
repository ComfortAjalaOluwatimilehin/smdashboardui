import React from "react";
export const GeneralStyles = () => {
  return (
    <span
      dangerouslySetInnerHTML={{
        __html: `
        
       <style>
            .margin-lg-top{margin-top:4em;}
            .margin-md-top{margin-top:2em;}
            .margin-sm-top{margin-top:1em;}
            .margin-lg-right{margin-right:4em;}
            .margin-lg-left{margin-right:4em;}
            .margin-md-right{margin-right:2em;}
            .margin-md-left{margin-right:2em;}
            .margin-sm-right{margin-right:1em;}
            .margin-sm-left{margin-right:1em;}
       </style>
        
        `,
      }}
    />
  );
};
