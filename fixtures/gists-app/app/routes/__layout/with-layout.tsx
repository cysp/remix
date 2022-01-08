import { HeadersFunction, LoaderFunction, Outlet, json } from "remix";

export const loader: LoaderFunction = () => {
  return json(
    {},
    {
      headers: {
        route: "/__layout/with-layout"
      }
    }
  );
};

export const headers: HeadersFunction = ({ loaderHeaders }) => {
  return loaderHeaders;
};

export default function WithLayout() {
  return (
    <div>
      <h1>Page inside layout</h1>
    </div>
  );
}
