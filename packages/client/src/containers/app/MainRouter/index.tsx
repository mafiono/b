import React, { FC } from 'react';
import { Route, Switch } from 'react-router-dom';
import { Routes } from '../../../constants/routes';
import { Homepage } from '../../../pages/Homepage';
import { Profile } from '../../../pages/Profile';
import { Casino } from '../../../pages/Casino';
import { NotFoundPage } from '../../../pages/NotFoundPage';
import { Promotions } from '../../../pages/Promotions';
import { PromotionSlug } from '../../../pages/PromotionSlug';
import { GameSlug } from '../../../pages/Game';

interface IProps {}

const MainRouter: FC<IProps> = () => (
  <Switch>
    <Route path={Routes.Homepage} component={Homepage} exact />
    <Route path={Routes.Profile} component={Profile} />
    <Route path={Routes.Casino} component={Casino} />
    <Route path={Routes.PromotionSlug} component={PromotionSlug}/>
    <Route path={Routes.Promotions} component={Promotions}/>
    <Route path={Routes.GamesSlug} component={GameSlug}/>
    <Route component={NotFoundPage} />
  </Switch>
);

export { MainRouter };
