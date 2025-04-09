import React from 'react';
import { Link } from 'react-router-dom';
import { useStationContext } from '../../store/station-context';

const HowWeHelp: React.FC = () => {
  const { basePath } = useStationContext();
  return (
    <section className="how-we-help">
      <div className="container">
        <div>
          <h2>How can we help?</h2>
          <ul>
            <li>
              {/* <a href="/calculators" style={{ display: 'flex', flexFlow: 'column', alignItems: 'center' }}> */}
              <a href="" style={{ display: 'flex', flexFlow: 'column', alignItems: 'center' }}>
                <svg
                  aria-hidden="true"
                  focusable="false"
                  data-prefix="fas"
                  data-icon="calculator-alt"
                  className="svg-inline--fa fa-calculator-alt fa-w-16 fa-4x"
                  role="img"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 512 512"
                >
                  <path
                    fill="currentColor"
                    d="M192 288H32c-17.67 0-32 14.33-32 32v160c0 17.67 14.33 32 32 32h160c17.67 0 32-14.33 32-32V320c0-17.67-14.33-32-32-32zm-29.09 140.29c3.12 3.12 3.12 8.19 0 11.31l-11.31 11.31c-3.12 3.12-8.19 3.12-11.31 0L112 422.63l-28.29 28.29c-3.12 3.12-8.19 3.12-11.31 0L61.09 439.6c-3.12-3.12-3.12-8.19 0-11.31L89.37 400l-28.29-28.29c-3.12-3.12-3.12-8.19 0-11.31l11.31-11.31c3.12-3.12 8.19-3.12 11.31 0l28.3 28.28 28.29-28.29c3.12-3.12 8.19-3.12 11.31 0l11.31 11.31c3.12 3.12 3.12 8.19 0 11.31L134.63 400l28.28 28.29zM480 0H320c-17.67 0-32 14.33-32 32v160c0 17.67 14.33 32 32 32h160c17.67 0 32-14.33 32-32V32c0-17.67-14.33-32-32-32zm-16 120c0 4.42-3.58 8-8 8h-40v40c0 4.42-3.58 8-8 8h-16c-4.42 0-8-3.58-8-8v-40h-40c-4.42 0-8-3.58-8-8v-16c0-4.42 3.58-8 8-8h40V56c0-4.42 3.58-8 8-8h16c4.42 0 8 3.58 8 8v40h40c4.42 0 8 3.58 8 8v16zm16 168H320c-17.67 0-32 14.33-32 32v160c0 17.67 14.33 32 32 32h160c17.67 0 32-14.33 32-32V320c0-17.67-14.33-32-32-32zm-16 152c0 4.42-3.58 8-8 8H344c-4.42 0-8-3.58-8-8v-16c0-4.42 3.58-8 8-8h112c4.42 0 8 3.58 8 8v16zm0-64c0 4.42-3.58 8-8 8H344c-4.42 0-8-3.58-8-8v-16c0-4.42 3.58-8 8-8h112c4.42 0 8 3.58 8 8v16zM192 0H32C14.33 0 0 14.33 0 32v160c0 17.67 14.33 32 32 32h160c17.67 0 32-14.33 32-32V32c0-17.67-14.33-32-32-32zm-16 120c0 4.42-3.58 8-8 8H56c-4.42 0-8-3.58-8-8v-16c0-4.42 3.58-8 8-8h112c4.42 0 8 3.58 8 8v16z"
                  ></path>
                </svg>
                <span style={{ marginTop: '2rem', fontWeight: 500 }}>Use our Calculators</span>
                <span>Tools to help you calculate everything from Statutory Sick Pay, to Redundancy Pay.</span>
              </a>
            </li>
            <li>
              {/* <a href="/browse" style={{ display: 'flex', flexFlow: 'column', alignItems: 'center' }}> */}
              <Link to={`${basePath}/browse`} style={{ display: 'flex', flexFlow: 'column', alignItems: 'center' }}>
                <svg
                  aria-hidden="true"
                  focusable="false"
                  data-prefix="fas"
                  data-icon="file-alt"
                  className="svg-inline--fa fa-file-alt fa-w-12 fa-4x"
                  role="img"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 384 512"
                >
                  <path
                    fill="currentColor"
                    d="M224 136V0H24C10.7 0 0 10.7 0 24v464c0 13.3 10.7 24 24 24h336c13.3 0 24-10.7 24-24V160H248c-13.2 0-24-10.8-24-24zm64 236c0 6.6-5.4 12-12 12H108c-6.6 0-12-5.4-12-12v-8c0-6.6 5.4-12 12-12h168c6.6 0 12 5.4 12 12v8zm0-64c0 6.6-5.4 12-12 12H108c-6.6 0-12-5.4-12-12v-8c0-6.6 5.4-12 12-12h168c6.6 0 12 5.4 12 12v8zm0-72v8c0 6.6-5.4 12-12 12H108c-6.6 0-12-5.4-12-12v-8c0-6.6 5.4-12 12-12h168c6.6 0 12 5.4 12 12v8zm0-72c0 6.6-5.4 12-12 12H108c-6.6 0-12-5.4-12-12v-8c0-6.6 5.4-12 12-12h168c6.6 0 12 5.4 12 12v8zM288 264c0 4.4-3.6 8-8 8H136c-4.4 0-8-3.6-8-8v-16c0-4.4 3.6-8 8-8h144c4.4 0 8 3.6 8 8v16zm96-96c0 4.4-3.6 8-8 8H136c-4.4 0-8-3.6-8-8v-16c0-4.4 3.6-8 8-8h240c4.4 0 8 3.6 8 8v16z"
                  ></path>
                </svg>
                <span style={{ marginTop: '2rem', fontWeight: 500 }}>Browse our advice</span>
                <span>Thousands of articles, templates and advice from our team of legal professionals.</span>
                {/* </a> */}
              </Link>
            </li>
            <li>
              {/* <a href="/contact" style={{ display: 'flex', flexFlow: 'column', alignItems: 'center' }}> */}
              <a href="" style={{ display: 'flex', flexFlow: 'column', alignItems: 'center' }}>
                <svg
                  aria-hidden="true"
                  focusable="false"
                  data-prefix="fas"
                  data-icon="comment-alt-lines"
                  className="svg-inline--fa fa-comment-alt-lines fa-w-16 fa-4x"
                  role="img"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 512 512"
                >
                  <path
                    fill="currentColor"
                    d="M448 0H64C28.7 0 0 28.7 0 64v288c0 35.3 28.7 64 64 64h96v84c0 9.8 11.2 15.5 19.1 9.7L304 416h144c35.3 0 64-28.7 64-64V64c0-35.3-28.7-64-64-64zM288 264c0 4.4-3.6 8-8 8H136c-4.4 0-8-3.6-8-8v-16c0-4.4 3.6-8 8-8h144c4.4 0 8 3.6 8 8v16zm96-96c0 4.4-3.6 8-8 8H136c-4.4 0-8-3.6-8-8v-16c0-4.4 3.6-8 8-8h240c4.4 0 8 3.6 8 8v16z"
                  ></path>
                </svg>
                <span style={{ marginTop: '2rem', fontWeight: 500 }}>Speak to an expert</span>
                <span>Need help with a specific matter? Contact us directly.</span>
              </a>
            </li>
          </ul>
        </div>
      </div>
    </section>
  );
};

export default HowWeHelp;
