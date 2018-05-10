
import { isNurseLate } from './index';

describe("Nurses Utils", () => {
  describe("isNurseLate function", () => {
    it(`should be same nurse and assignemnt start dates and time LESS then 30 min`, () => {
      const assignment = {
        end_date: "2018-04-25",
        start_date: "2018-04-19",
        start_time: "10:00:00",
      };
      const in_out = {start: "2018-04-19 10:11:00"};

      const result = isNurseLate({assignment, in_out});

      expect(result).toBeFalsy();
    });

    it(`should be same nurse and assignemnt start dates and SAME time`, () => {
      const assignment = {
        start_date: "2018-04-19",
        start_time: "23:45:00",
      };
      const in_out = {start: "2018-04-19 23:45:00"};

      const result = isNurseLate({assignment, in_out});

      expect(result).toBeFalsy();
    });

    it(`should be same nurse and assignemnt start dates and time MORE then 30 min`, () => {
      const assignment = {
        end_date: "2018-04-25",
        start_date: "2018-04-19",
        start_time: "10:00:00",
      };
      const in_out = {start: "2018-04-19 10:45:00"};

      const result = isNurseLate({assignment, in_out});

      expect(result).toBeTruthy();
    });

    it(`should be different nurse and assignemnt start dates and time LESS then 30 min`, () => {
      const assignment = {
        end_date: "2018-04-25",
        start_date: "2018-04-20",
        start_time: "00:15:00",
      };
      const in_out = {start: "2018-04-19 23:59:00"};

      const result = isNurseLate({assignment, in_out});

      expect(result).toBeFalsy();
    });

    it(`should be different nurse and assignemnt start dates and time MORE then 30 min`, () => {
      const assignment = {
        end_date: "2018-04-25",
        start_date: "2018-04-19",
        start_time: "23:45:00",
      };
      const in_out = {start: "2018-04-20 00:45:06"};

      const result = isNurseLate({assignment, in_out});

      expect(result).toBeTruthy();
    });

    it(`should be in between assignemnt start and end date and time LESS then 30 min`, () => {
      const assignment = {
        end_date: "2018-04-25",
        start_date: "2018-04-19",
        start_time: "23:45:00",
      };
      const in_out = {start: "2018-04-22 00:00:06"};

      const result = isNurseLate({assignment, in_out});

      expect(result).toBeFalsy();
    });

    it(`should be in between assignemnt start and end date and time MORE then 30 min`, () => {
      const assignment = {
        end_date: "2018-04-25",
        start_date: "2018-04-19",
        start_time: "23:45:00",
      };
      const in_out = {start: "2018-04-22 00:45:06"};

      const result = isNurseLate({assignment, in_out});

      expect(result).toBeTruthy();
    });

    it(`should be same nurse start date and assignemnt end date and time LESS then 30 min`, () => {
      const assignment = {
        end_date: "2018-04-25",
        start_date: "2018-04-19",
        start_time: "10:00:00",
      };
      const in_out = {start: "2018-04-25 10:11:00"};

      const result = isNurseLate({assignment, in_out});

      expect(result).toBeFalsy();
    });

    it(`should be same nurse start date and assignemnt end date and SAME time`, () => {
      const assignment = {
        end_date: "2018-04-25",
        start_date: "2018-04-19",
        start_time: "10:00:00",
      };
      const in_out = {start: "2018-04-25 10:00:00"};

      const result = isNurseLate({assignment, in_out});

      expect(result).toBeFalsy();
    });

    it(`should be same nurse start date and assignemnt end date and time MORE then 30 min`, () => {
      const assignment = {
        end_date: "2018-04-25",
        start_date: "2018-04-19",
        start_time: "10:00:00",
      };
      const in_out = {start: "2018-04-25 10:45:00"};

      const result = isNurseLate({assignment, in_out});

      expect(result).toBeFalsy();
    });

    it(`should be different nurse start date and assignemnt end dates and time LESS then 30 min`, () => {
      const assignment = {
        end_date: "2018-04-25",
        start_date: "2018-04-19",
        start_time: "23:45:00",
      };
      const in_out = {start: "2018-04-26 00:03:22"};

      const result = isNurseLate({assignment, in_out});

      expect(result).toBeFalsy();
    });

    it(`should be different nurse start date and assignemnt end dates and time MORE then 30 min`, () => {
      const assignment = {
        end_date: "2018-04-25",
        start_date: "2018-04-19",
        start_time: "23:45:00",
      };
      const in_out = {start: "2018-04-25 00:45:06"};

      const result = isNurseLate({assignment, in_out});

      expect(result).toBeTruthy();
    });
  });
});
