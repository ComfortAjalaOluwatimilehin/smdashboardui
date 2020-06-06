import React from "react";
export const HomeStyles = () => {
  return (
    <span
      dangerouslySetInnerHTML={{
        __html: `
        
       <style>

       .highlightedoutstanding{
        display: block;
        text-align: center;
    }
    .greedfree{
        background: #4CAF50;
    }
    .lightred{
                background: rgba(244, 67, 54, 0.24);

            }

            .mediumred{
                background: #e87d7d;
                font-weight:600;
            }

            .deepred{
                background: #e24b4b;font-weight:900;
            }

       </style>
        
        `,
      }}
    />
  );
};
