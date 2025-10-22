import { useEffect, useState } from "react";
import { PageSectionContainer } from "@/framework/PageSectionContainer";
import FormSectionHeader from "@/components/FormSectionHeader";
import FormActionsContainer from "@/components/FormActionsContainer";
import { FlexColumnLayout } from "@/framework/FlexColumnLayout";
import { UserController } from "@/controllers/user.controller";
import { LocationController } from "@/controllers/location.controller";
import type { IUserProfile } from "model/user-profile.types";
import type { ICountry } from "model/location.types";

export default function ProfileTabSection() {
  const [profile, setProfile] = useState<IUserProfile | null>(null);
  const [countries, setCountries] = useState<ICountry[]>([]);

  useEffect(() => {
    UserController.me().then(setProfile);
    LocationController.loadCountries().then(setCountries);
  }, []);

  return (
    <form>
      <FlexColumnLayout spacing="medium">
        {/* Alerts placeholder */}
        {/* <ProfilePageAlert errorMessages={[]} successMessage={null} /> */}

        <PageSectionContainer>
          {/* Personal Information */}
          <FormSectionHeader title="Personal Information" />

          <div className="form-group">
            <label className="form-group__label form-group__label--required">
              Email Address
            </label>
            <p>{profile?.email || ""}</p>
          </div>

          <div className="form-group">
            <label className="form-group__label">Town or City</label>
            <div className="form-group__hint">For example: Sheffield</div>
            <input
              type="text"
              className="form-group__input"
              placeholder="Town or City"
            />
          </div>

          <div className="form-group">
            <label className="form-group__label">Country</label>
            <select>
              <option value="">Select your country</option>
              {countries.map((c) => (
                <option key={c.code} value={c.code}>
                  {c.name}
                </option>
              ))}
            </select>
          </div>

          <div className="form-group">
            <label className="form-group__label">Your Instagram Account</label>
            <div className="form-group__hint">Your human Instagram account</div>
            <div className="instagram-input-group">
              <span className="instagram-input-group__prefix"></span>
              <input
                type="text"
                className="instagram-input-group__input"
                placeholder="my_human_username"
              />
            </div>
          </div>
        </PageSectionContainer>

        <PageSectionContainer>
          {/* Plushie Instagram Accounts */}
          <FormSectionHeader title="Plushie Instagram Accounts" />
          <div className="plushie-instagram-account-section__description">
            No plushie Instagram accounts added yet. Connect one or more of your
            Instagram accounts to your profile
          </div>
          <div className="form-content">
            <button className="button--link" type="button">
              Add Another Account
            </button>
          </div>
        </PageSectionContainer>

        <FormActionsContainer>
          <button type="submit" className="form__button form__button--primary">
            Save Profile
          </button>
        </FormActionsContainer>
      </FlexColumnLayout>
    </form>
  );
}
