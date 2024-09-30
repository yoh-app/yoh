import React, { useEffect, useState } from 'react';

export default function SvgIcon({ src }) {
  const [svgHtml, setSvgHtml] = useState('');

  const fetchSvg = (src) => {
    fetch(src)
      .then((response) => {
        return response.text()
      })
      .then((res)=>{
        setSvgHtml(res);
      })
      .then(function (myJson) {
        console.log(myJson);
      });
  }

  useEffect(() => {
    fetchSvg(src);
  }, [src])
  return (
    <span dangerouslySetInnerHTML={{ __html: svgHtml }} />
  );
}
