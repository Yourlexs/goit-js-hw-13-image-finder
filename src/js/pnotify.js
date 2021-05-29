import '@pnotify/core/dist/PNotify.css';
import '@pnotify/core/dist/Material.css';
import '@pnotify/core/dist/BrightTheme.css';

import { defaults } from '@pnotify/core';

defaults.delay = 2000;

const { error } = require('@pnotify/core');

export default error;