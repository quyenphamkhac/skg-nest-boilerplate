import {
  Ability,
  AbilityBuilder,
  InferSubjects,
  AbilityClass,
  ExtractSubjectType,
} from '@casl/ability';
import { Injectable } from '@nestjs/common';
import { Action } from 'src/common/enums/action.enum';
import { TaskStatus } from 'src/common/enums/task-status.enum';
import { Task } from 'src/modules/tasks/entites/task.entity';
import { User } from 'src/modules/users/entities/user.entity';

type Subjects = InferSubjects<typeof Task | typeof User> | 'all';

export type AppAbility = Ability<[Action, Subjects]>;

@Injectable()
export class CaslAbilityFactory {
  createForUser(user: User) {
    const { can, cannot, build } = new AbilityBuilder<
      Ability<[Action, Subjects]>
    >(Ability as AbilityClass<AppAbility>);
    if (user) {
      can(Action.Manage, 'all');
    } else {
      can(Action.Read, 'all');
    }
    cannot(Action.Delete, Task, { status: TaskStatus.DONE });
    return build({
      detectSubjectType: (item) =>
        item.constructor as ExtractSubjectType<Subjects>,
    });
  }
}
