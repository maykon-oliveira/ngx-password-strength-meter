import { StrengthFeedback } from './strength-feedback';

export interface StrengthResult {
  /**
   * Integer from 0-4
   * 0 too guessable: risky password
   * 1 very guessable: protection from throttled online attacks
   * 2 somewhat guessable: protection from unthrottled online attacks
   * 3 safely unguessable: moderate protection from offline slow-hash scenario
   * 4 very unguessable: strong protection from offline slow-hash scenario
   */
  score: number;
  /**
   * verbal feedback to help choose better passwords. set when score <= 2.
   */
  feedback: StrengthFeedback;
}
