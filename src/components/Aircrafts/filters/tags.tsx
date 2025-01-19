import { MouseEvent, memo, useCallback, useMemo } from "react";
import { Flex, Tag } from "antd";

import { AircraftsFilters } from "@/store/aircrafts/types";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import {
  removeAircraftsFilter,
  selectAircraftsFilters,
} from "@/store/aircrafts/slice";

const labels: Record<keyof AircraftsFilters, string> = {
  registrationNumber: "Рег номер",
  model: "Модель",
  status: "Статус",
  yearFrom: "Год от",
  yearTo: "Год до",
};

type TagProps = {
  id: keyof AircraftsFilters;
  value: string;
};

const AircraftsFilterTag = memo<TagProps>((props) => {
  const { id, value } = props;

  const dispatch = useAppDispatch();

  const removeFilter = useCallback(
    (e: MouseEvent<HTMLElement>) => {
      e.preventDefault();
      dispatch(removeAircraftsFilter(id));
    },
    [id, dispatch],
  );

  return (
    <Tag key={id} closeIcon onClose={removeFilter}>
      {labels[id]}: <b>{value}</b>
    </Tag>
  );
});

AircraftsFilterTag.displayName = "AircraftsFilterTag";

export const AircraftsFiltersTags = memo(() => {
  const filters = useAppSelector(selectAircraftsFilters);

  const activeFilters = useMemo(() => {
    const result: [string, string][] = [];
    for (const key in filters) {
      const value = filters[key as keyof AircraftsFilters];
      if (value) {
        result.push([key, value]);
      }
    }
    return result;
  }, [filters]);

  if (!activeFilters.length) {
    return null;
  }

  return (
    <Flex wrap>
      {activeFilters.map(([key, value]) => (
        <AircraftsFilterTag
          key={key}
          id={key as keyof AircraftsFilters}
          value={value}
        />
      ))}
    </Flex>
  );
});

AircraftsFiltersTags.displayName = "AircraftsFiltersTags";
