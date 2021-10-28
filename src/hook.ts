import React from 'react';

import { SagaStatus } from 'common-resources';
import { useCountry } from './stores';

// import { statusUnset as accountStatusUnset } from './stores/account';

/**
 * @description
 * @step1 subscribe Connect hook
 * @step2 check the session storage ? choose the provider : none provider
 * @step3 decide china Id by step2
 * @step4 prepare the static date (tokenMap, ammMap, faitPrice, gasPrice, forex, Activities ...)
 * @step5 launch the page
 * @todo each step has error show the ErrorPage , next version for service maintain page.
 */

export function useInit() {
    const [state, setState] = React.useState<keyof typeof SagaStatus>('PENDING')

    const {status: countryStatus, statusUnset: countryUnset} = useCountry();


    React.useEffect(() => {
        switch (countryStatus) {
            case SagaStatus.PENDING:
                if (state !== SagaStatus.PENDING) {
                    setState(SagaStatus.PENDING)
                }
                break
            case SagaStatus.ERROR:
                countryUnset();
                setState('ERROR')
                //TODO show error at button page show error  some retry dispat again
                break;
            case SagaStatus.DONE:
                countryUnset();
                setState('DONE')

                break;
            default:
                break;
        }
    }, [countryStatus]);

   return {
        state,
    }
}



