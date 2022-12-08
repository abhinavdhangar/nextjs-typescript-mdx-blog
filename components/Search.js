import Link from 'next/link';
import SearchIcon from '@mui/icons-material/Search';
import React from 'react';
import { useTheme } from "next-themes";
export default function Search() {
   const { theme } = useTheme();

   const color = theme=="light"?"black":"white"
  return (
    <div>
      <Link href={'/search'}>
        <a>
          {' '}
          <SearchIcon htmlColor={color} />{' '}
        </a>
      </Link>
    </div>
  );
}
