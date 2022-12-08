import React from "react";
import { useRouter } from 'next/router'
// import { Breadcrumbs as MUIBreadcrumbs, Typography } from "@mui/material";
import Link from 'next/link'

const Breadcrumb = props => {
  let { present } = props
  const router = useRouter()
  present = present.split(" ")
  present.splice(4)

  present = present.join(" ")

  const pathnames = router.pathname.split("/").filter(x => x);

  // console.log(router)
  return (
    <div className={`flex`}>
      {pathnames.length > 0 ? (
        <div className="flex">
          <Link href={"/"} passHref legacyBehavior>
            <p className={`cursor-pointer text-sm`}>Home</p>
          </Link>
          <p className="px-2">/</p>
        </div>

      ) : (
        <p> Home </p>
      )}
      {pathnames.map((name, index) => {
        const routeTo = `/${pathnames.slice(0, index + 1).join("/")}`;
        const isLast = index === pathnames.length - 1;
        return isLast ? (
          <p className="text-sm">{present} {"  "} ...</p>
          // <Typography key={name}>{name}</Typography>
        ) : (
          <div className={`flex`}>
            <Link href={routeTo} passHref legacyBehavior>
              <p className=" text-sm cursor-pointer">{name}</p>
            </Link>
            <p className="px-2">/</p>
          </div>
          // <Link key={name} onClick={() => history.push(routeTo)}>
          //   {name}
          // </Link>
        );
      })}
    </div>
  );
};

export default Breadcrumb;
