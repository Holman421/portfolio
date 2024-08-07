import { keyframes } from "@mui/material";

export const lightFlickering = () => {
  return keyframes`
  0% {
    opacity: 0;
  }
  10%, 50%, 65%, 80%, 95% {
    opacity: 0.2;
  }
  20%, 40%, 57.5%, 72.5%, 87.5% {
    opacity: 0;
  }
  100% {
    opacity: 1;
  }
`;
};

export const lightFlickering2 = () => {
  return keyframes`
  0% {
    opacity: 0;
  }
  10%, 50%, 65%, 80%, 97.5% {
    opacity: 0.2;
  }
  20%, 40%, 57.5%, 70%, 87.5% {
    opacity: 0;
  }
  100% {
    opacity: 1;
  }
`;
};

export const lightFlickering3 = () => {
  return keyframes`
  0% {
    opacity: 0;
  }
  10%, 50%, 70%, 80%, 90% {
    opacity: 0.2;
  }
  20%, 35%, 57.5%, 75%, 87.5% {
    opacity: 0;
  }
  100% {
    opacity: 1;
  }
`;
};

export const avatarAnimation = () => {
  return keyframes`
0% {
  opacity: 1;
}
60%, 64%, 68% {
 opacity: 1;
}
 62%, 66% {
  opacity: 0.8;
}
100% {
  opacity: 1;
}
`;
};

export const widthChange = () => {
  return keyframes`
0% {
 width: 100%;
}
50% {
  width: 120%;
}
100% {
  width: 100%;
}
`;
};

export const addFlickeringAnimation = (tl, target) => {
  tl.to(target, {
    opacity: 0,
    duration: 0.1,
  })
    .to(target, {
      opacity: 0.2,
      duration: 0.1,
    })
    .to(target, {
      opacity: 0,
      duration: 0.1,
    })
    .to(target, {
      opacity: 0.2,
      duration: 0.1,
    })
    .to(target, {
      opacity: 0,
      duration: 0.1,
    })
    .to(target, {
      opacity: 0.2,
      duration: 0.1,
    })
    .to(target, {
      opacity: 0,
      duration: 0.1,
    })
    .to(target, {
      opacity: 1,
      duration: 0.1,
    });
};
