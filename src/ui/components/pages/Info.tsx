import * as styles from './styles/info.styl';
import * as React from 'react';
import {Trans, translate} from 'react-i18next';
import {BigLogo} from '../head';

@translate('extension')
export class Info extends React.Component {

    render() {
        return <div className={`${styles.content} body1`}>
            <BigLogo className={`${styles.logoLeft} margin-main`} noTitle={true}/>

            <div className="margin-main basic500">
                <Trans i18nKey='info.keepUp'>
                    TN Keeper — is the safest way to interact with third-party web resources with TN-integrated functionality or DApps. Using TN Keeper, you can sign transactions and remain safe from malicious sites.
                </Trans>
            </div>

            <a className="link black" target='_blank' href='https://blackturtle.eu'>blackturtle.eu</a>

            <div className={`${styles.social} margin-main`}>
                <div className="margin-main basic500">
                    <Trans i18nKey='info.joinUs'>Join the TN Community</Trans>
                </div>
                <ul>
                    <li className={styles.github}><a target="_blank" href="https://github.com/BlackTurtle123/"></a></li>
                    <li className={styles.telegram}><a target="_blank" href="https://telegram.me/BlackTurtle"></a></li>
                    <li className={styles.twitter}><a target="_blank" href="https://twitter.com/__Black_Turtle_"></a></li>
                    <li className={styles.facebook}><a target="_blank" href="https://www.facebook.com/BlackTurtle.eu"></a></li>
                </ul>
            </div>

            <div className="basic500">&copy; Turtle Network</div>

        </div>;
    }
}
