<script setup>
const props = defineProps({
  data: {
    type: Object,
    required: true
  },
  info: {
    type: Object,
    default: null
  }
})

const formData = reactive({})
const isSubmitting = ref(false)
const isSubmitted = ref(false)

onMounted(() => {
  props.data.fields.forEach((field) => {
    formData[field.name] = field.type === 'checkbox' ? false : ''
  })
  formData.privacyConsent = false
})

const handleSubmit = async () => {
  isSubmitting.value = true
  await new Promise(resolve => setTimeout(resolve, 1000))
  isSubmitting.value = false
  isSubmitted.value = true

  setTimeout(() => {
    isSubmitted.value = false
    Object.keys(formData).forEach((key) => {
      formData[key] = typeof formData[key] === 'boolean' ? false : ''
    })
  }, 3000)
}

const getIconComponent = (iconName) => {
  const icons = {
    mail: `<path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><polyline points="22,6 12,13 2,6"/>`,
    phone: `<path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/>`,
    clock: `<circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/>`
  }
  return icons[iconName] || ''
}
</script>

<template>
  <section
    class="contact-form-section"
    :aria-label="data.ariaLabel ?? '문의하기'"
  >
    <div class="contact-form-section__container container">
      <div class="contact-form-section__main">
        <form
          class="contact-form"
          @submit.prevent="handleSubmit"
        >
          <div class="contact-form__fields">
            <div
              v-for="field in data.fields"
              :key="field.id"
              :class="[
                'contact-form__group',
                { 'contact-form__group--full': field.type === 'textarea' }
              ]"
            >
              <label
                :for="field.id"
                class="contact-form__label"
              >
                {{ field.label }}
                <span
                  v-if="field.required"
                  class="contact-form__required"
                  aria-hidden="true"
                >*</span>
              </label>

              <input
                v-if="['text', 'email', 'tel'].includes(field.type)"
                :id="field.id"
                v-model="formData[field.name]"
                :type="field.type"
                :name="field.name"
                :placeholder="field.placeholder"
                :required="field.required"
                :aria-describedby="field.ariaDescribedBy"
                class="contact-form__input"
              />

              <div
                v-else-if="field.type === 'select'"
                class="contact-form__select-wrap"
              >
                <select
                  :id="field.id"
                  v-model="formData[field.name]"
                  :name="field.name"
                  :required="field.required"
                  :aria-describedby="field.ariaDescribedBy"
                  class="contact-form__select"
                >
                  <option
                    v-for="option in field.options"
                    :key="option.value"
                    :value="option.value"
                    :disabled="option.value === ''"
                  >
                    {{ option.label }}
                  </option>
                </select>
                <svg
                  class="contact-form__select-icon"
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  stroke-width="2"
                  aria-hidden="true"
                >
                  <path d="M6 9l6 6 6-6" />
                </svg>
              </div>

              <textarea
                v-else-if="field.type === 'textarea'"
                :id="field.id"
                v-model="formData[field.name]"
                :name="field.name"
                :placeholder="field.placeholder"
                :required="field.required"
                :aria-describedby="field.ariaDescribedBy"
                class="contact-form__textarea"
              />

              <p
                v-if="field.helpText"
                :id="field.ariaDescribedBy"
                class="contact-form__help"
              >
                {{ field.helpText }}
              </p>
            </div>
          </div>

          <div class="contact-form__consent">
            <div class="contact-form__checkbox">
              <input
                :id="data.privacyConsent.id"
                v-model="formData.privacyConsent"
                type="checkbox"
                name="privacyConsent"
                :required="data.privacyConsent.required"
                :aria-describedby="data.privacyConsent.ariaDescribedBy"
              />
              <label :for="data.privacyConsent.id">
                {{ data.privacyConsent.label }}
                <span
                  v-if="data.privacyConsent.required"
                  class="contact-form__required"
                  aria-hidden="true"
                >*</span>
              </label>
            </div>
            <p
              v-if="data.privacyConsent.helpText"
              :id="data.privacyConsent.ariaDescribedBy"
              class="contact-form__help"
            >
              {{ data.privacyConsent.helpText }}
            </p>
          </div>

          <div class="contact-form__submit">
            <button
              type="submit"
              :disabled="isSubmitting"
              :aria-label="data.submitButton.ariaLabel ?? data.submitButton.label"
              class="contact-form__btn btn btn--primary"
            >
              <span v-if="isSubmitting">{{ data.submitButton.loadingLabel }}</span>
              <span v-else-if="isSubmitted">{{ data.submitButton.successLabel }}</span>
              <span v-else>{{ data.submitButton.label }}</span>
            </button>
          </div>

          <Transition name="fade">
            <div
              v-if="isSubmitted"
              class="contact-form__success"
              role="alert"
              aria-live="polite"
            >
              <svg
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                stroke-width="2"
                aria-hidden="true"
              >
                <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
                <polyline points="22 4 12 14.01 9 11.01" />
              </svg>
              {{ data.successMessage }}
            </div>
          </Transition>
        </form>
      </div>

      <aside
        v-if="info"
        class="contact-form-section__sidebar"
      >
        <h2 class="contact-form-section__sidebar-title">{{ info.title }}</h2>
        <ul class="contact-form-section__info-list">
          <li
            v-for="item in info.items"
            :key="item.id"
            class="contact-form-section__info-item"
          >
            <div class="contact-form-section__info-icon">
              <svg
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round"
                aria-hidden="true"
                v-html="getIconComponent(item.icon)"
              />
            </div>
            <div class="contact-form-section__info-content">
              <span class="contact-form-section__info-label">{{ item.label }}</span>
              <a
                v-if="item.link"
                :href="item.link"
                class="contact-form-section__info-value contact-form-section__info-value--link"
              >
                {{ item.value }}
              </a>
              <span v-else class="contact-form-section__info-value">{{ item.value }}</span>
            </div>
          </li>
        </ul>
      </aside>
    </div>
  </section>
</template>

<style lang="scss" scoped>
@use '~/assets/styles/tokens/colors' as *;
@use '~/assets/styles/tokens/typography' as *;
@use '~/assets/styles/tokens/spacing' as *;

.contact-form-section {
  padding: $space-12 0;
  background-color: $neutral-50;

  @media (min-width: $container-md) {
    padding: $space-16 0;
  }

  &__container {
    display: flex;
    flex-direction: column;
    gap: $space-8;

    @media (min-width: $container-lg) {
      flex-direction: row;
      gap: $space-12;
    }
  }

  &__main {
    flex: 1;
  }

  &__sidebar {
    width: 100%;
    background-color: $color-surface;
    border-radius: $radius-xl;
    padding: $space-6;
    height: fit-content;

    @media (min-width: $container-lg) {
      width: 320px;
      flex-shrink: 0;
    }
  }

  &__sidebar-title {
    font-size: $font-size-lg;
    font-weight: $font-weight-semibold;
    color: $color-text-primary;
    margin-bottom: $space-5;
  }

  &__info-list {
    display: flex;
    flex-direction: column;
    gap: $space-4;
    list-style: none;
  }

  &__info-item {
    display: flex;
    align-items: flex-start;
    gap: $space-3;
  }

  &__info-icon {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 44px;
    height: 44px;
    background-color: $primary-50;
    border-radius: $radius-lg;
    color: $primary-600;
    flex-shrink: 0;
  }

  &__info-content {
    display: flex;
    flex-direction: column;
    gap: $space-0-5;
    padding-top: $space-1;
  }

  &__info-label {
    font-size: $font-size-xs;
    font-weight: $font-weight-medium;
    color: $color-text-tertiary;
    text-transform: uppercase;
    letter-spacing: 0.05em;
  }

  &__info-value {
    font-size: $font-size-sm;
    font-weight: $font-weight-medium;
    color: $color-text-primary;

    &--link {
      color: $primary-600;
      text-decoration: none;
      transition: color $transition-fast;

      &:hover {
        color: $primary-700;
        text-decoration: underline;
      }
    }
  }
}

.contact-form {
  background-color: $color-surface;
  border-radius: $radius-xl;
  padding: $space-6;
  box-shadow: 0 4px 20px rgba($neutral-900, 0.05);

  @media (min-width: $container-md) {
    padding: $space-8;
  }

  &__fields {
    display: grid;
    grid-template-columns: 1fr;
    gap: $space-5;

    @media (min-width: $container-md) {
      grid-template-columns: repeat(2, 1fr);
    }
  }

  &__group {
    display: flex;
    flex-direction: column;
    gap: $space-2;

    &--full {
      @media (min-width: $container-md) {
        grid-column: 1 / -1;
      }
    }
  }

  &__label {
    font-size: $font-size-sm;
    font-weight: $font-weight-medium;
    color: $color-text-primary;
  }

  &__required {
    color: $primary-500;
    margin-left: $space-0-5;
  }

  &__input,
  &__textarea,
  &__select {
    width: 100%;
    padding: $space-3 $space-4;
    font-family: inherit;
    font-size: $font-size-base;
    color: $color-text-primary;
    background-color: $color-surface;
    border: 2px solid $neutral-200;
    border-radius: $radius-lg;
    transition: border-color $transition-fast, box-shadow $transition-fast;

    &::placeholder {
      color: $color-text-tertiary;
    }

    &:hover {
      border-color: $primary-300;
    }

    &:focus {
      outline: none;
      border-color: $primary-500;
      box-shadow: 0 0 0 4px rgba($primary-500, 0.1);
    }
  }

  &__textarea {
    min-height: 160px;
    resize: vertical;
  }

  &__select-wrap {
    position: relative;
  }

  &__select {
    appearance: none;
    padding-right: $space-10;
    cursor: pointer;
    background-color: $color-surface;

    &:invalid,
    &:has(option[value=""]:checked) {
      color: $color-text-tertiary;
    }
  }

  &__select-icon {
    position: absolute;
    right: $space-4;
    top: 50%;
    transform: translateY(-50%);
    color: $color-text-tertiary;
    pointer-events: none;
    transition: color $transition-fast;

    .contact-form__select:focus + & {
      color: $primary-500;
    }
  }

  &__help {
    font-size: $font-size-xs;
    color: $color-text-tertiary;
    margin-top: $space-1;
  }

  &__consent {
    margin-top: $space-6;
    padding-top: $space-6;
    border-top: 1px solid $color-border-light;
  }

  &__checkbox {
    display: flex;
    align-items: center;
    gap: $space-3;

    input[type="checkbox"] {
      width: 20px;
      height: 20px;
      accent-color: $primary-600;
      cursor: pointer;
      border-radius: $radius-sm;
    }

    label {
      font-size: $font-size-sm;
      color: $color-text-secondary;
      cursor: pointer;
    }
  }

  &__submit {
    margin-top: $space-6;
  }

  &__btn {
    width: 100%;
    padding: $space-4;
    font-size: $font-size-base;
    font-weight: $font-weight-semibold;

    @media (min-width: $container-md) {
      width: auto;
      min-width: 200px;
    }
  }

  &__success {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: $space-2;
    margin-top: $space-4;
    padding: $space-4;
    font-size: $font-size-sm;
    font-weight: $font-weight-medium;
    color: $success-700;
    background-color: $success-50;
    border: 1px solid $success-200;
    border-radius: $radius-lg;

    svg {
      color: $success-600;
      flex-shrink: 0;
    }
  }
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>
