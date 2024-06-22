import { Card, CardContent, CardFooter, CardHeader } from "framework7-react";
import React from "react";

const CardComponent = ({ mode, title, content, price, image }) => {
  return (
    <Card outlineMd>
      {mode !== "compact" && (
        <img
          src={image}
          alt=""
          className="h-60 w-full rounded-md object-cover object-center"
        />
      )}
      <CardContent className="flex">
        <div>
          {mode === "compact" && (
            <img
              src={image}
              alt=""
              className="h-20 aspect-square rounded-md object-cover object-center"
            />
          )}
        </div>
        <div className="ml-2">
          <h2 className="text-xl capitalize">{title}</h2>
          <p className="opacity-50">{content}</p>
        </div>
        
      </CardContent>
      <div className="ml-3 pb-2 text-lg opacity-70">
        ${price}
      </div>
    </Card>
  );
};

export default CardComponent;
