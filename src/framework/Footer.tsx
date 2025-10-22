export function Footer() {
  return (
    <footer className="footer">
      <div className="footer__container">
        <div className="footer__row">
          <div className="footer__column">
            <div className="footer__bio">
              <p className="footer__heading">Banjo Hootson</p>
              <p>Born in Yorkshire.</p>
              <p>Raised on pints and social media.</p>
              <p>
                Made in{" "}
                <span className="footer__line-through">the Royal Navy</span>{" "}
                Ikea.
              </p>
            </div>
          </div>

          <div className="footer__column">
            <div className="footer__location">
              <p className="footer__heading">Location</p>
              <p>Selby</p>
              <p>United Kingdom</p>
            </div>
          </div>

          <div className="footer__column">
            <div className="footer__contact">
              <p className="footer__heading">Contact</p>
              <ul className="footer__list">
                <li>
                  <a href="mailto:hello@banjohootson.com">
                    hello@banjohootson.com
                  </a>
                </li>
                <li>
                  <a
                    href="https://www.instagram.com/banjohootson/"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Instagram
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
