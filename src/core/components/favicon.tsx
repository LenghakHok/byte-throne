export function Favicon() {
  return (
    <>
      <link
        href="/svg/icon-dark.svg"
        media="(prefers-color-scheme: dark)"
        rel="icon"
        type="image/svg+xml"
      />
      <link
        href="/svg/icon-light.svg"
        media="(prefers-color-scheme: light)"
        rel="icon"
        type="image/svg+xml"
      />
    </>
  );
}
