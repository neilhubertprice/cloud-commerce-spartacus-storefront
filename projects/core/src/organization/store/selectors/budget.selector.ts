import { createSelector, MemoizedSelector } from '@ngrx/store';
import {
  StateWithOrganization,
  OrganizationState,
  BudgetManagement,
} from '../organization-state';
import { getOrganizationState } from './feature.selector';
import { EntityLoaderState } from '../../../state/utils/entity-loader/index';
import { LoaderState } from '../../../state/utils/loader/loader-state';
import { entityStateSelector } from '../../../state/utils/entity-loader/entity-loader.selectors';
import { Budget } from '../../../model/budget.model';
import { BudgetSearchConfig } from '../../model/search-config';
import { ListModel } from '../../../model/misc.model';
import { serializeBudgetSearchConfig } from '../../utils/budgets';

export const getBudgetManagementState: MemoizedSelector<
  StateWithOrganization,
  BudgetManagement
> = createSelector(
  getOrganizationState,
  (state: OrganizationState) => state.budget
);

export const getBudgetsState: MemoizedSelector<
  StateWithOrganization,
  EntityLoaderState<Budget>
> = createSelector(
  getBudgetManagementState,
  (state: BudgetManagement) => state && state['budget-entities']
);

// export const getBudgetsValuesState: MemoizedSelector<
//   StateWithOrganization,
//   { [id: string]: LoaderState<Budget> }
// > = createSelector(
//   getBudgetsState,
//   (state: EntityLoaderState<Budget>) => state && state.entities
// );

export const getBudgetState = (
  budgetCode: string
): MemoizedSelector<StateWithOrganization, LoaderState<Budget>> =>
  createSelector(
    getBudgetsState,
    (state: EntityLoaderState<Budget>) => entityStateSelector(state, budgetCode)
  );

export const getBudgetList = (
  params: BudgetSearchConfig
): MemoizedSelector<
  StateWithOrganization,
  LoaderState<ListModel>
> =>
  createSelector(
    getBudgetManagementState,
    (state: BudgetManagement) => {
      const list: any = entityStateSelector(
        state['budget-lists'],
        serializeBudgetSearchConfig(params)
      );
      if (!list.value || !list.value.budgets) {
        return list;
      }
      const res: LoaderState<ListModel> = Object.assign({}, list, {
        value: {
          budgets: list.value.budgets.map(
            code => entityStateSelector(state['budget-entities'], code).value
          ),
        },
      });
      return res;
    }
  );
