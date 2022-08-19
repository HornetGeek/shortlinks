import './style.css'




export const ListShortLinks = ({ shortlinks }) => {
  if (shortlinks[0]) {
    return (
      <>
        <div id="shortlink-api-shortlinks-get" className="action get">
          <div id="ListOfShortlinks">
            <h4>shortlinks List</h4>
            {shortlinks.map((short) => (
              <pre key={`${short.slug}${short.ios.primary}${short.android.primary}`}>
                <code>
                  <span className="hljs-attribute">slug </span>: <span className="hljs-string">{short.slug} </span><br></br>
                  <span className="hljs-attribute">ios </span>: <br></br>
                  <span className="hljs-attribute"> primary </span>: <span className="hljs-string">{short.ios?.primary} </span><br></br>
                  <span className="hljs-attribute"> fallback </span>: <span className="hljs-string">{short.ios?.fallback} </span><br></br>
                  <span className="hljs-attribute">android </span>:<br></br>
                  <span className="hljs-attribute"> primary </span>: <span className="hljs-string">{short.android?.primary} </span><br></br>
                  <span className="hljs-attribute"> fallback </span>: <span className="hljs-string">{short.android?.fallback} </span><br></br>
                  <span className="hljs-attribute">web </span>: <span className="hljs-string">{short.web} </span>
                </code>
              </pre>
            ))}
          </div>

        </div>
      </>
    )
  }
}

