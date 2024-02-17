import type { FC } from 'react';

import './index.less';

import { Typography } from 'antd';

import { useLocale } from '@/locales';

const GeographyPage: FC = () => {
  const { formatMessage } = useLocale();

  return (
    <div className="geography-page ">
      <div className="innerText">
        <Typography className="geography-intro">
          {/* {formatMessage({ id: 'app.geography.geographyInfo' })} */}

        </Typography>
      </div>
    </div>
  );
};

export default GeographyPage;
