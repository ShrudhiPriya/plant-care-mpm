import { useState } from "react";
import { ArrowAltRight, ArrowAltLeft } from "react-flaticons";

export default function Pagination({ page }) {
  return (
    <div>
      <button>
        <ArrowAltLeft />
      </button>
      <button>
        <ArrowAltRight />
      </button>
      <div>{page.pageNumber}</div>
    </div>
  );
}
