import { HeadersFunction, LoaderFunction, Outlet, json } from "remix";

export const loader: LoaderFunction = () => {
  return json(
    {},
    {
      headers: {
        route: "/route-headers"
      }
    }
  );
};

export const headers: HeadersFunction = ({ loaderHeaders }) => {
  return loaderHeaders;
};

export default function RouteHeadersIndex() {
  return <></>;
}
