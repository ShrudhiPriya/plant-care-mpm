import { ArrowAltRight, ArrowAltLeft } from "react-flaticons";

export default function Pagination({ page, updatePageNumber }) {
  return (
    <div>
      <button onClick={() => updatePageNumber(page.pageNumber - 1)}>
        <ArrowAltLeft />
      </button>
      <button onClick={() => updatePageNumber(page.pageNumber + 1)}>
        <ArrowAltRight />
      </button>
      <div>{page.pageNumber}</div>
    </div>
  );
}
