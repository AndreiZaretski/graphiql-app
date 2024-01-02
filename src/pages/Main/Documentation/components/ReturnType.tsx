import { useDispatch } from 'react-redux';
import {
  setOpenTypes,
  setSelectedType,
  setOpenQueries,
} from '@store/features/documentationSlice';
import styles from '../Documentation.module.scss';
import { DocTypeProps } from '@type/interfaces/props.interface';

function ReturnType(props: DocTypeProps) {
  const { type } = props;
  const dispatch = useDispatch();

  const selectType = (name: string) => {
    dispatch(setOpenTypes(true));
    dispatch(setOpenQueries(false));
    dispatch(setSelectedType(name));
  };

  if (type.kind === 'LIST') {
    return (
      <span>
        [
        <button
          className={`button button_colored ${styles.docs__type}`}
          onClick={() => selectType(type.ofType.name)}
        >
          {type.ofType.name}
        </button>
        ]
      </span>
    );
  }

  if (type.name) {
    return (
      <button
        className={`button button_colored ${styles.docs__type}`}
        onClick={() => selectType(type.name)}
      >
        {type.name}
      </button>
    );
  }

  if (type.ofType.name) {
    if (type.kind === 'NON_NULL') {
      return (
        <span>
          <button
            className={`button button_colored ${styles.docs__type}`}
            onClick={() => selectType(type.ofType.name)}
          >
            {type.ofType.name}
          </button>
          !
        </span>
      );
    }
    return (
      <button
        className={`button button_colored ${styles.docs__type}`}
        onClick={() => selectType(type.ofType.name)}
      >
        {type.ofType.name}
      </button>
    );
  }

  if (type.ofType.ofType.name) {
    if (type.ofType.kind === 'NON_NULL') {
      return (
        <span>
          [
          <button
            className={`button button_colored ${styles.docs__type}`}
            onClick={() => selectType(type.ofType.ofType.name)}
          >
            {type.ofType.ofType.name}
          </button>
          !]!
        </span>
      );
    }
    return (
      <span>
        [
        <button
          className={`button button_colored ${styles.docs__type}`}
          onClick={() => selectType(type.ofType.ofType.name)}
        >
          {type.ofType.ofType.name}
        </button>
        ]
      </span>
    );
  }

  if (type.ofType.ofType.ofType.name) {
    if (type.ofType.ofType.kind === 'NON_NULL') {
      return (
        <span>
          [
          <button
            className={`button button_colored ${styles.docs__type}`}
            onClick={() => selectType(type.ofType.ofType.ofType.name)}
          >
            {type.ofType.ofType.ofType.name}
          </button>
          !]!
        </span>
      );
    }
    return (
      <span>
        [
        <button
          className={`button button_colored ${styles.docs__type}`}
          onClick={() => selectType(type.ofType.ofType.ofType.name)}
        >
          {type.ofType.ofType.ofType.name}
        </button>
        ]
      </span>
    );
  }

  return (
    <button className={`button button_colored ${styles.docs__type}`}>
      TYPE
    </button>
  );
}

export default ReturnType;
