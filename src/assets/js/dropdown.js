document.addEventListener("DOMContentLoaded", () => {
  const dropdowns = document.querySelectorAll('.dropdown-menu');

  dropdowns.forEach(dd => {
    const title = dd.querySelector('.dd-title');

    title.addEventListener('click', () => {
      // Close all other dropdowns
      dropdowns.forEach(other => {
        if (other !== dd) other.classList.remove('open');
      });

      // Toggle this dropdown
      dd.classList.toggle('open');
    });
  });
});
