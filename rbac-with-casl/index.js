import { defineAbility } from '@casl/ability';

const ability = defineAbility((can, cannot) => {
  can('manage', 'all');
  cannot('delete', 'User');
});

console.log(ability.can('read', 'Post'));
console.log(ability.can('read', 'User'));
console.log(ability.can('update', 'User'));
console.log(ability.can('delete', 'User'));
console.log(ability.cannot('delete', 'User'));
