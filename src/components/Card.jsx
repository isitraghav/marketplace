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
        {mode === "compact" && (
          <div className="w-1/3 mt-1">
            <img
              src={image}
              alt=""
              className="h-20 w-20 aspect-square rounded-md object-cover object-center"
            />
          </div>
        )}
        <div className={`${mode === "compact" ? "w-2/3 ml-2" : "w-full"}`}>
          <h2
            className={`text-${
              mode === "compact" ? "2xl" : "xl"
            } capitalize line-clamp-2`}
          >
            {title}
          </h2>
          <p
            className={`line-clamp-3 text-${
              mode === "compact" ? "sm" : "xs"
            } opacity-50`}
          >
            {content}
          </p>
        </div>
      </CardContent>
      <div className="ml-3 pb-2 text-lg opacity-70">${price}</div>
    </Card>
  );
};

export default CardComponent;
